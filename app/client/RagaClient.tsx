"use client";

import { useEffect, useState } from "react";
import VideoTile from "@/components/VideoTile";
import { dbKnowMusic } from "@/lib/client/firebaseKM.client";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { slugify } from "@/lib/string/slugify";
import ClientWrap from "@/components/ClientWrap";
import RagaCard from "@/components/RagaCard";
import AddVideo from "@/components/AddVideo";

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
                                link="comp|lyri|movi"
                                width=""
                            />
                        ))
                    }
                </div>
            ) : (!loading &&
                <div className="flex flex-col align-middle mx-auto bg-(--surface2) p-4 mt-4 rounded-lg">
                    <p className="">Be the first to add a video to this Raga!</p>
                    <div className="mx-auto">
                        <AddVideo slug={slug} name={name}
                            tag={"raga"} onSaved={refresh} src={`/raga/${slug}`}
                            className={"text-5xl! mt-3 "} />

                    </div>
                </div>
            )
            }
        </ClientWrap >
    );
}
