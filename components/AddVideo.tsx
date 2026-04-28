"use client";

import { useEffect, useState } from "react";
import { PlusIcon } from "@heroicons/react/20/solid";
import Modal from "./Modal";
import YouTubePlayer from "./YTPlayer";
import { getVideoId } from "@/lib/video/getVideoId";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/client/firebaseKM.client";
import { onAuthStateChanged } from "firebase/auth";
import getHeader from "@/lib/client/getHearder";
import { useUser } from "@/context/UserContext";
import Message from "./Message";
import AddButton from "./AddButton";

interface AddVideo {
    name: string;
    type: string;
    slug: string;
    onSaved?: (msg: string) => void;
}

export default function AddVideo({ name, type, slug, onSaved }: AddVideo) {
    const { user, verifying: authenticating } = useUser();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
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

                // Fetch data from YouTube API route
                const res = await fetch(`/api/youtube?vid=${id}`, {
                    headers: await getHeader(),
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
            headers: { "Content-Type": "application/json", ...await getHeader() },
            body: JSON.stringify({
                videoId: videoId,
                data: {
                    title: title,
                    [type]: slug.replace(/%20/g, " "),
                },
            }),
        }).then((res) => {
            if (!res.ok) {
                setMessage(`Error:${res.status} ${res.statusText}`);
                throw new Error("Failed to save video");
            }
            else {
                cleanup(true);
                setMessage("Success:Video added successfully!");
                if (onSaved) {
                    onSaved("Video added successfully!");
                }
            }
        }).catch((err) => {
            console.error(err);
            setMessage("Error:Error saving video: " + err.message);
        });
    }
    function cleanup(open = false) {
        setOpen(open);
        setYoutubeUrl("");
        setVideoId("");
        setTitle("");
        setMessage("");
        setApiStatus({ status: 0, text: "" });
    }

    return (
        <div>
            <AddButton text="Video"
                onClick={() => {
                    if (!user) {
                        router.push("/auth/signin");
                        return;
                    }
                    setOpen(true);
                }}
            />

            <Modal
                isOpen={open}
                onClose={() => { cleanup() }}
                children={
                    <div className="p-4 scroll-auto min-h-60">
                        <h2 className="text-xl font-semibold mb-2">Add a video</h2>
                        <p className=" bg-my-accent/20 p-2 ">{type} : {name}</p>

                        {/* YouTube URL */}
                        <p className="text-sm min-h-6 px-1 pl-1 ">
                            <span > {videoId && `Video ID: ${videoId}`}</span>
                        </p>
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
                                        <span className="font-semibold">{title}</span>
                                    </p>
                                )}
                                <div className="flex">
                                    <button
                                        onClick={() => handleSave()}
                                        className="mt-4 px-4 py-2 bg-my-primary text-white rounded hover:bg-my-primary/80 transition"
                                    >
                                        Save
                                    </button>
                                </div>
                            </div>
                        )}
                        <div className="py-2">
                            {message && <Message message={message} />}
                        </div>
                    </div>
                }
            />
        </div>
    );
}
