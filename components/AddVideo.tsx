"use client";

import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import Modal from "./Modal";
import YouTubePlayer from "./YTPlayer";
import { getVideoId } from "@/lib/getVideoId";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/firebaseKM.client";
import { onAuthStateChanged } from "firebase/auth";

interface AddVideo {
    name: string;
    type: string;
    slug: string;
    onSaved?: (msg: string) => void;
}

export default function AddVideo({ name, type, slug, onSaved }: AddVideo) {
    const [open, setOpen] = useState(false);
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [videoId, setVideoId] = useState("");
    const [title, setTitle] = useState("");
    const [API_STATUS, setApiStatus] = useState({ status: 0, text: "" });
    const router = useRouter();

    const [authReady, setAuthReady] = useState(false);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, () => {
            setAuthReady(true);
        });
        return () => unsub();
    }, []);



    // Fetch metadata when URL changes
    useEffect(() => {
        if (!authReady) return;   // ⬅️ Wait for Firebase Auth to load

        const id = getVideoId(youtubeUrl);
        setVideoId(id);

        if (!id) { setTitle(null); return };

        async function fetchMetadata() {
            try {
                // Get ID token for authenticated requests
                const token = await auth.currentUser?.getIdToken(true);
                const header = token ? { Authorization: `Bearer ${token}` } : {};

                // Fetch data from YouTube API route
                const res = await fetch(`/api/youtube?vid=${id}`, {
                    headers: header,
                });
                setApiStatus({ status: res.status, text: res.statusText });

                const data = await res.json();
                //  Set title and description from API response
                setTitle(data.title || "");
            } catch (err) {
                console.error("Metadata fetch failed", err);
            }
        }
        fetchMetadata();
    }, [youtubeUrl]);

    async function handleSave() {
        // Add to list, send to API, etc.
        await fetch("/api/videos/tag", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                videoId: videoId,
                data: {
                    title: title,
                    [type]: slug,
                },
            }),
        }).then((res) => {
            if (!res.ok) {
                throw new Error("Failed to save video");
            }
            else {
                cleanup();
                if (onSaved) onSaved("Video added successfully!");
            }
        }).catch((err) => {
            console.error(err);
            alert("Error saving video: " + err.message);
        });
    }
    function cleanup() {
        setOpen(false);
        setYoutubeUrl("");
        setVideoId("");
        setTitle("");
        setApiStatus({ status: 0, text: "" });
    }

    return (
        <div className="mt-4">
            <button
                onClick={() => {
                    if (!auth.currentUser) {
                        router.push("/auth/signin");
                        return;
                    }
                    setOpen(true);
                }}
                className="flex items-center gap-2 px-4 py-1 bg-my-secondary text-white rounded hover:bg-my-primary/80 transition"
            >
                <PlusIcon className="h-5 w-5 font-bold" />
                <p>Add video</p>
            </button>

            <Modal
                isOpen={open}
                onClose={() => { cleanup() }}
                children={
                    <div className="p-4 scroll-auto min-h-60">
                        <h2 className="text-xl font-semibold text-gray-600 mb-2">Add a video</h2>
                        <p className=" bg-my-accent/20 p-2 ">{type} : {name}</p>
                        <p className="text-sm min-h-6 px-1 pl-1 ">
                            <span className="text-gray-500"> {videoId && `Video ID: ${videoId}`}</span>
                        </p>

                        {/* YouTube URL */}
                        <div>
                            <input
                                className="w-full border border-gray-300 rounded p-2 focus:ring focus:ring-blue-300"
                                placeholder="Paste YouTube URL"
                                value={youtubeUrl}
                                onChange={(e) => setYoutubeUrl(e.target.value)}
                            />
                        </div>
                        {API_STATUS.status !== 200 && API_STATUS.status !== 0 && (
                            <p className="text-sm text-gray-500 pl-1 py-2">
                                {API_STATUS.status} {API_STATUS.text}
                            </p>
                        )}
                        {videoId && API_STATUS.status === 200 && (
                            <div>
                                <div className="mt-2">
                                    <YouTubePlayer key={videoId} videoId={videoId || ""} autoplay={false} />
                                </div>
                                {title && (
                                    <p className="mt-1">
                                        <span className="font-semibold text-gray-600">{title}</span>
                                    </p>
                                )}
                                <button
                                    onClick={() => handleSave()}
                                    className="mt-4 px-4 py-2 bg-my-primary text-white rounded hover:bg-my-primary/80 transition"
                                >
                                    Save & Close
                                </button>
                            </div>
                        )}
                    </div>
                }
            />
        </div>
    );
}
