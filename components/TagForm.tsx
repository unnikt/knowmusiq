import { useEffect, useState } from "react";
import YouTubePlayer from "./YTPlayer";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { auth, dbKnowMusic } from "@/lib/client/firebaseKM.client";
import { SaveVideo } from "@/lib/video/SaveVideo";
import { TrashIcon, XMarkIcon } from "@heroicons/react/20/solid";

interface TagFormProps {
    vid: string;
    onLoad?: (flag: boolean) => void;
}
export default function TagForm({ vid, onLoad }: TagFormProps) {
    const [video, setVideo] = useState<any>(null);
    const [tagValue, setTagValue] = useState<string | null>("")
    const [selectedTag, setSelectedTag] = useState<string | null>("")
    const [suggestions, setSuggestions] = useState<{ name: string; slug: string }[]>([]);
    const [loadingSuggestions, setLoadingSuggestions] = useState(false);
    const PERSON_TAGS = ["Composer", "Singer", "Lyricist"];

    const [tags, setTags] = useState([
        { key: "Composer", value: "" },
        { key: "Singer", value: "" },
        { key: "Lyricist", value: "" },
        { key: "Movie", value: "" },
        { key: "Language", value: "" },
        { key: "Raga", value: "" },
        { key: "Tala", value: "" }
    ]);

    useEffect(() => {
        if (!vid) return;
        if (onLoad) onLoad(true);

        const loadVideo = async () => {
            try {
                const q = query(
                    collection(dbKnowMusic, "videos"),
                    where("videoId", "==", vid),
                    limit(1)
                );

                const snaps = await getDocs(q);
                setVideo(!snaps.empty ? snaps.docs[0].data() : null);
            } catch (err) {
                console.error("Error loading video:", err);
            } finally {
                if (onLoad) onLoad(false);
            }
        };

        loadVideo();
    }, [vid]);

    function clearTag() {
    }
    async function handleChange() {
        const min = 0
        setSuggestions([]);
        if (tagValue.length < min) return
        setLoadingSuggestions(true);
        try {

            // Get ID token for authenticated requests
            const token = await auth.currentUser?.getIdToken(true);
            const header = token ? { Authorization: `Bearer ${token}` } : {};

            // Fetch data from YouTube API route
            if (PERSON_TAGS.includes(selectedTag)) {
                const idx = tagValue.slice(0, 3).toUpperCase()
                const res = await fetch(`/api/persons?key=idx&value=${idx}`, {
                    headers: header,
                });
                const data = await res.json();
                const values = data.values.filter((e: { type: string; }) => e.type == selectedTag.slice(0, 4).toLowerCase());
                setSuggestions(values || []);
            }

        } catch (err) {
            console.error("Error fetching suggestions:", err);
        } finally {
            setLoadingSuggestions(false);
        }
    }

    function handleSave() {
        const filter = tags.filter(e => e.value != "");
        const data = filter.reduce((acc, e) => {
            acc[e.key.slice(0, 4).toLowerCase()] = e.value;
            return acc;
        }, {});
        console.log(video.videoId, data);
        SaveVideo(video.videoId, data)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    return (
        <div className="p-2 bg-(--surface) rounded-md">
            <div className="flex flex-col sm:flex-row gap-1 w-full">
                <div className="w-full max-w-200  aspect-video pt-4">
                    <YouTubePlayer key={vid} videoId={vid} />
                    {video && (
                        <div key={video}>
                            <h2 className="text-md font-semibold ">{video.title}</h2>
                            <p className="mb-6">{video.description}</p>
                        </div>
                    )}
                </div>

                <div className="p-2 w-full lg:ml-2 ">
                    <input className="w-full my-2 rounded p-0"
                        value={tagValue}
                        onChange={(e) => setTagValue(e.target.value)}
                        onKeyDown={() => { handleChange() }} />

                    {suggestions.length > 0 && (
                        <div className="absolute mt-1 menu min-h-10 min-w-25 rounded shadow">
                            {suggestions.map((s, i) => (
                                <div
                                    key={i}
                                    className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => {
                                        setTags(prev =>
                                            prev.map(t =>
                                                t.key === selectedTag
                                                    ? { ...t, value: s.name }
                                                    : t
                                            )
                                        );
                                        setTagValue(s.name)
                                        setSuggestions([])
                                    }}
                                >
                                    {s.name}
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex flex-col  gap-1 ">
                        {tags.map(t =>
                            <span key={t.key}
                                className={`p-1 cursor-pointer  ${selectedTag === t.key ? "bg-(--primary)/20" : "text-slate-700 bg-slate-200"}`}
                                onClick={() => { setSelectedTag(t.key); setTagValue(""); setSuggestions([]) }}
                            > {t.value ? `${t.key}: ${t.value}` : t.key}
                            </span>
                        )}
                    </div>

                    <div className="flex items-center">
                        <button className="btn btn-primary"
                            onClick={handleSave} >
                            Save tags
                        </button>
                        <button className="ml-4 btn btn-outline"
                            onClick={handleSave} >
                            Add new
                        </button>
                        <button
                            className=" p-2 rounded"
                            disabled={!selectedTag}
                            onClick={() => {
                                setTags(prev =>
                                    prev.map(tag =>
                                        tag.key === selectedTag ? { ...tag, value: "" } : tag
                                    )
                                );
                                setSelectedTag("");
                                setTagValue("");
                                setSuggestions([]);
                            }}
                        >
                            <TrashIcon className="w-5 h-5" />
                        </button>

                        <button className="btn pl-4 border-0! ">
                            {loadingSuggestions ? "Loading..." : ""}
                        </button>
                    </div>
                </div>
            </div>
        </div >
    )

}