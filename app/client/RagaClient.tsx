"use client";

import styles from "@/app/ui/home.module.css"
import { useEffect, useState } from "react";
import VideoTile from "@/components/VideoTile";
import { dbKnowMusic } from "@/lib/client/firebaseKM.client";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { slugify } from "@/lib/string/slugify";
import ClientWrap from "@/components/ClientWrap";
import TopBar from "@/components/TopBar";
import AddVideo from "@/components/AddVideo";
import RagaCard from "@/components/RagaCard";
import { Description } from "@headlessui/react";

interface RagaClientProps {
    slug: string;
    name?: string;
    displayName: string;
    type?: string;
    rid?: string;
    pid?: string;
    parent?: string;
    arohana?: string;
    avarohana?: string;
    description?: string;
}

export default function RagaClient({ slug, name, displayName, type, rid, pid, parent, arohana, avarohana, description }: RagaClientProps) {
    const [videos, setVideos] = useState([]);
    const [refreshKey, setRefreshKey] = useState(0);
    const [loading, setLoading] = useState("Loading...");
    const [display, setDisplay] = useState("videos");
    const [message, setMessage] = useState("");

    async function loadVideos() {

        const q = query(collection(dbKnowMusic, "videos"), where("raga", "==", slug), limit(20));
        const snapVideos = getDocs(q)

        const videos = (await snapVideos).docs.map((doc) => ({ id: doc.id, videoId: doc.data(), ...doc.data() }));

        setVideos(videos || []);
        setLoading(null);
    }

    useEffect(() => {
        loadVideos();
    }, [refreshKey]);

    // Expose a refresh function for AddVideo
    const refresh = (msg: string) => { setRefreshKey((k) => k + 1); setMessage(msg) };

    return (
        <ClientWrap>
            <TopBar />
            <RagaCard
                name={displayName}
                type={type}
                rid={rid}
                pid={pid}
                description={description}
                parent={{ name: parent, slug: slugify(parent) }} // { name, slug }
                arohana={arohana}
                avarohana={avarohana}
                display={"videos"}
                onSaved={refresh}
            />

            <p className="grid grid-cols-2 gap-2 md:grid-cols-3"></p>

            {loading && <p className="text-my-primary p-2">{loading}</p>}
            {videos.length > 0 ? (
                <div key={refreshKey} className={"videoGrid mt-4"} >
                    {
                        videos.map((video: any) => (
                            <VideoTile
                                key={video.id}
                                video={video}
                                url={`/videos/${video.videoId}`}
                                target="_self"
                                link="comp|lyri"
                                width=""
                            />
                        ))
                    }
                </div>
            ) : (!loading &&
                <p className="bg-(--surface) rounded p-4">No videos found for this raga.</p>
            )
            }
        </ClientWrap >
    );
}
