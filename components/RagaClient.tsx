"use client";

import { useEffect, useState } from "react";
import VideoTile from "@/components/VideoTile";
import { dbKnowMusic } from "@/lib/client/firebaseKM.client";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import RagaCard from "./RagaCard";
import { slugify } from "@/lib/slugify";

interface RagaClientProps {
    slug: string;
    name?: string;
    displayName: string;
    type?: string;
    rid?: string;
    pid?: string;
    parent?: string;
    arohana?: string;
    avarohana?: string
}

export default function RagaClient({ slug, name, displayName, type, rid, pid, parent, arohana, avarohana }: RagaClientProps) {
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
            <RagaCard
                name={displayName}
                type={type}
                rid={rid}
                pid={pid}
                description={"A beautiful raga for every occasion.."}
                parent={{ name: parent, slug: slugify(parent) }} // { name, slug }
                arohana={arohana}
                avarohana={avarohana}
                display={"videos"}
                onSaved={refresh}
            />

            {message && <p className="text-green-500">{message}</p>}
            {videos.length > 0 ? (
                <div key={refreshKey} className="videoGrid mt-4">
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
