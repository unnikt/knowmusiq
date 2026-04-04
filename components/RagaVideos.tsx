"use client";

import { useEffect, useState } from "react";
import VideoTile from "@/components/VideoTile";
import AddVideo from "./AddVideo";
import { dbKnowMusic } from "@/lib/firebaseKM.client";
import { collection, getDocs, limit, query, where } from "firebase/firestore";

interface RagaVideosProps {
    slug: string;
    name?: string;
    type?: string;
}

export default function RagaVideos({ type, name, slug }: RagaVideosProps) {
    const [videos, setVideos] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const [message, setMessage] = useState("");

    async function loadVideos() {

        const q = query(collection(dbKnowMusic, "videos"), where("raga", "==", slug), limit(20));
        const snapVideos = getDocs(q)

        const videos = (await snapVideos).docs.map((doc) => ({ id: doc.id, videoId: doc.data(), ...doc.data() }));

        setVideos(videos || []);
    }

    useEffect(() => {
        loadVideos();
    }, [refreshKey]);

    // Expose a refresh function for AddVideo
    const refresh = (msg: string) => { setRefreshKey((k) => k + 1); setMessage(msg) };

    return (
        <div>
            <AddVideo slug={slug} onSaved={refresh} name={name} type={type} />
            {message && <p className="text-green-500">{message}</p>}
            {videos.length > 0 ? (
                <div className="videoGrid">
                    {videos.map((video: any) => (
                        <VideoTile
                            key={video.id}
                            video={video}
                            url={`https://www.youtube.com/watch?v=${video.videoId}`}
                            target="_blank"
                        />
                    ))}
                </div>
            ) : (
                <p className="text-gray-500">No videos found for this raga.</p>
            )}
        </div>
    );
}
