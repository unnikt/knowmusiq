"use client";

import { useEffect, useState } from "react";
import { collection, query, where, orderBy, getDocs, addDoc } from "firebase/firestore";
import { dbKnowMusic } from "@/lib/firebaseKM.client";
import VideoTile from "@/components/VideoTile";
import { useApp } from "@/context/AppContext";
import TagVideoButton from "@/components/TagButton";

export default function SearchVideosClient() {
    const [searchTerm, setSearchTerm] = useState("");
    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [fromCache, setCache] = useState(true);

    // ⭐ Fix: define error + setter
    const [error, setError] = useState<string | null>(null);

    const { setMinimiseHeader } = useApp();
    useEffect(() => {
        setMinimiseHeader(true);   // minimise on load
        return () => setMinimiseHeader(false); // restore on exit (optional)
    }, [setMinimiseHeader]);

    // ----------------------------------------------------
    // 1. Search Firestore (YouTubeVideos collection)
    // ----------------------------------------------------
    async function searchLocal(title: string) {
        const q = query(
            collection(dbKnowMusic, "YouTubeVideos"),
            where("search", ">=", title),
            where("search", "<=", title + "\uf8ff"),
            orderBy("title")
        );
        const snap = await getDocs(q);
        if (snap.size < 0) setCache(false);
        return snap.docs.map((d) => ({ id: d.id, videoId: d.data().videoId, ...d.data() }));
    }

    // ----------------------------------------------------
    // 2. Search YouTube API (fallback)
    // ----------------------------------------------------
    async function searchYoutubeAPI(title: string) {
        const res = await fetch(`/api/youtube-search?query=${title}`);
        const data = await res.json();

        if (data.error === "quota") {
            setError("YouTube API quota exceeded. Try again tomorrow.");
            return [];
        }

        return data.items.map((item: any) => ({
            videoId: item.id.videoId || item.id,
            title: item.snippet.title,
            description: item.snippet.description,
            thumbnail: item.snippet.thumbnails.high.url,
        }));
    }

    // ----------------------------------------------------
    // 3. Save results to Firestore
    // ----------------------------------------------------
    async function saveToFirestore(video: any) {
        try {
            await addDoc(collection(dbKnowMusic, "YouTubeVideos"), {
                videoId: video.videoId,
                title: video.title,
                description: video.description,
                thumbnail: video.thumbnail,
                createdAt: Date.now(),
                slug: video.title.toLowerCase(),
                search: searchTerm.toLocaleLowerCase(),
            });
        }
        catch (err) {
            console.error("🔥 FIRESTORE SAVE ERROR:", err);
        }
    }

    // ----------------------------------------------------
    // 4. Main search handler
    // ----------------------------------------------------
    async function handleSearch() {
        setError(null);
        setLoading(true);

        if (searchTerm.length < 3) return;

        setCache(true);
        // 1. Search Firestore first
        const local = await searchLocal(searchTerm.toLowerCase());

        console.log("Local...", local);

        if (local.length > 0) {
            setResults(local);
            setLoading(false);
            return;
        }

        const stub = [
            {
                "videoId": "6RYm6hM9UpE",
                "title": "manakkale thathe - Raasaleela (1975)",
                "thumbnail": "https://i.ytimg.com/vi/6RYm6hM9UpE/hqdefault.jpg"
            },
            {
                "videoId": "rD6F55ERni0",
                "title": "Raasaleela | Manakkale Thathe song",
                "thumbnail": "https://i.ytimg.com/vi/rD6F55ERni0/hqdefault.jpg"
            },
            {
                "videoId": "cABCenaohIs",
                "title": "Manakkale Thathe Karaoke | KJ Yesudas | Raasaleela 1975 | Salil Chowdhury | Malayalam ROYMIX",
                "thumbnail": "https://i.ytimg.com/vi/cABCenaohIs/hqdefault.jpg"
            },
            {
                "videoId": "M4YQWUXC82U",
                "title": "Manakkale Thathe Marakkuda Thathe | മനയ്‌ക്കലെ തത്തേ മറക്കുടതത്തേ | Yesudas",
                "thumbnail": "https://i.ytimg.com/vi/M4YQWUXC82U/hqdefault.jpg"
            },
            {
                "videoId": "QUt5CDbcpFw",
                "title": "Manakkale Thathe Marakuda Thathe",
                "thumbnail": "https://i.ytimg.com/vi/QUt5CDbcpFw/hqdefault.jpg"
            },
            {
                "videoId": "JRLUaHTw-YQ",
                "title": "Manakkale Thathe Revival",
                "thumbnail": "https://i.ytimg.com/vi/JRLUaHTw-YQ/hqdefault.jpg"
            },
            {
                "videoId": "gvLZ-2zuR74",
                "title": "Manakkaley Thathey... Moynu Pasuar Baai...Sabita Chowdhury - Salil Chowdhury",
                "thumbnail": "https://i.ytimg.com/vi/gvLZ-2zuR74/hqdefault.jpg"
            },
            {
                "videoId": "wh074wBOrGo",
                "title": "manakkale thathe.....🦜✨ #oldclassic #kjyesudas #malayalam #lyrics #lyricsstatus #oldsong #oldisgold",
                "thumbnail": "https://i.ytimg.com/vi/wh074wBOrGo/hqdefault.jpg"
            },
            {
                "videoId": "Z7V8oFB6dp0",
                "title": "Manakkale Thathe - KG Markose (Ormakalil Salil Chowdhury - Live Programme 1996)",
                "thumbnail": "https://i.ytimg.com/vi/Z7V8oFB6dp0/hqdefault.jpg"
            },
            {
                "videoId": "XnTvuTWa9GI",
                "title": "Manakkale Thathe | Vayalar Ramavarma | Salil Chowdhury | KJ Yesudas | #beautifulnight",
                "thumbnail": "https://i.ytimg.com/vi/XnTvuTWa9GI/hqdefault.jpg"
            }
        ]


        // 2. Not found → search YouTube API
        const apiResults = await searchYoutubeAPI(searchTerm);
        // const apiResults = stub;

        if (apiResults.length === 0) {
            setLoading(false);
            return;
        }

        // 3. Save results to Firestore
        for (const video of apiResults) {
            await saveToFirestore(video);
        }

        setCache(false);
        setResults(apiResults);
        setLoading(false);
    }

    // ----------------------------------------------------
    // UI
    // ----------------------------------------------------
    return (
        <div>
            <h2 className="H2">Browse Videos <span className="text-sm text-white bg-my-lolite p-1 rounded ">{fromCache ? "cache" : "youtube"}</span></h2>

            <div className="searchBox">
                <input
                    className="w-full"
                    placeholder="Search videos by title…"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                        }
                    }}
                />

                <button
                    onClick={handleSearch}
                    className="bg-blue-600 text-white"
                >
                    Search
                </button>
            </div>

            {error && <p className="text-red-500 mb-4">{error}</p>}
            {loading && <p>Searching…</p>}

            <div className="videoGrid">
                {results.map((video) => (
                    <div key={video.id ? video.id : video.videoId}>
                        <VideoTile video={video} url={`videos/tag?url=${video.videoId}`} target={"_self"} />
                        <TagVideoButton videoId={video.videoId} />
                    </div>
                ))}
            </div>
        </div>
    );
}