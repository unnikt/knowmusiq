"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { dbKnowMusic } from "@/lib/firebaseKM.client";
import YouTubePlayer from "@/components/YTPlayer";
import BackButton from "@/components/BackButton";
import ClientWrap from "@/components/ClientWrap";
import VideoURL from "@/components/VideoURL";
import { PlusIcon } from "@heroicons/react/20/solid";
import Modal from "@/components/Modal";
import TaggingModal from "@/components/TaggingModel";

export default function TagVideoPage() {
    const [videoId, setVideoId] = useState<string | null>(null);
    const [video, setVideo] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (!videoId) return;

        setLoading(true);

        const loadVideo = async () => {
            try {
                const q = query(
                    collection(dbKnowMusic, "videos"),
                    where("videoId", "==", videoId),
                    limit(1)
                );

                const snaps = await getDocs(q);
                setVideo(!snaps.empty ? snaps.docs[0].data() : null);
            } catch (err) {
                console.error("Error loading video:", err);
            } finally {
                setLoading(false);
            }
        };

        loadVideo();
    }, [videoId]);

    return (
        <ClientWrap minimiseHeader={true}>
            <div className="section-mid mb-0">
                <BackButton />

                <VideoURL onChange={(id) => setVideoId(id)} />

                <YouTubePlayer key={videoId} videoId={videoId} />

                {loading && <p className="text-gray-500">Loading video…</p>}

                {video && (
                    <div key={video}>
                        <h2 className="text-md font-semibold text-gray-600">{video.title}</h2>
                        <p className="text-gray-600 mb-6">{video.description}</p>
                    </div>
                )}

                {/* {video?.tags && (
                    <div className="mb-6">
                        <h3 className="font-semibold mb-2">Existing Tags</h3>
                        <div className="flex flex-wrap gap-2">
                            {Object.entries(video.tags).map(([key, value]) => (
                                <span
                                    key={key}
                                    className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                                >
                                    {key}: {value}
                                </span>
                            ))}
                        </div>
                    </div>
                )} */}
                <div className="my-2"></div>
                <button
                    onClick={() => setOpen(true)}
                    className="flex items-center gap-2 px-4 py-1 bg-my-secondary text-white rounded hover:bg-my-primary/80 transition"
                >
                    <PlusIcon className="h-5 w-5 font-bold" />
                    <p>Add tags</p>
                </button>
                <Modal isOpen={open} onClose={() => setOpen(false)}
                    children={
                        <TaggingModal KEYS={["Composer", "Singer", "Movie", "Language", "Raga", "Tala"]} />
                    } />
            </div>
        </ClientWrap>
    );
}
