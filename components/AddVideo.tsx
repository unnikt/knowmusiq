"use client";

import { useEffect, useRef, useState } from "react";
import Modal from "./Modal";
import YouTubePlayer from "./YTPlayer";
import { parseYTURL } from "@/lib/video/ParseYTURL";
import { useRouter } from "next/navigation";
import { auth } from "@/lib/client/firebaseKM.client";
import { onAuthStateChanged } from "firebase/auth";
import getHeader from "@/lib/client/getHearder";
import { useUser } from "@/context/UserContext";
import Message from "./Message";
import { slugify } from "@/lib/string/slugify";
import { TagLabel } from "@/lib/const/Tags";

interface AddVideo {
    name?: string;
    tag?: string;
    slug?: string;
    onSaved?: (msg: string) => void;
    src?: string;
    raga?: string;
    className?: string;
}

export default function AddVideo({ name, tag, slug, onSaved, src, raga, className }: AddVideo) {
    const { user, verifying: authenticating } = useUser();
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [videoId, setVideoId] = useState("");
    const [title, setTitle] = useState("");
    const [movie, setMovie] = useState("");
    const [suggestions, setSuggestions] = useState([]);
    const [API_STATUS, setApiStatus] = useState({ status: 0, text: "" });
    const router = useRouter();
    const prevPrefix = useRef("");

    const [authReady, setAuthReady] = useState(false);

    const Tag = TagLabel(tag);

    useEffect(() => {
        const unsub = onAuthStateChanged(auth, () => {
            setAuthReady(true);
        });
        return () => unsub();
    }, []);

    // Fetch metadata when URL changes
    useEffect(() => {
        if (!authReady) return;   // ⬅️ Wait for Firebase Auth to load

        const id = parseYTURL(youtubeUrl);
        setVideoId(id);
        if (!id) { setTitle(null); return };

        async function fetchMetadata() {
            try {
                // Fetch data from YouTube API route
                const res = await fetch(`/api/youtube?vid=${id}`, {
                    headers: await getHeader(),
                });
                setApiStatus({ status: res.status, text: res.statusText });

                //  Set title and description from API response
                const data = await res.json();
                data.title ? setTitle(data.title || "") : setMessage("Error: Failed to fetch video metadata");

            } catch (err) {
                console.error("Metadata fetch failed", err);
            }
        }
        fetchMetadata();

    }, [youtubeUrl]);

    async function verifyMovie(movie: string) {
        setMovie(movie);

        if (movie.length < 3) return;

        const prefix = movie.substring(0, 3).toLowerCase();

        // Only call API if prefix changed
        if (prefix === prevPrefix.current) {
            return;
        }

        prevPrefix.current = prefix;
        const res = await fetch(`/api/tags?key=movi&value=${movie}`);
        const data = await res.json();
        setSuggestions(data.values || []);
    }

    async function handleSave() {
        const vData = {
            title: title,
            movi: movie,
            rdx: Date.now() % 10000
        };

        if (tag !== "movi") vData[tag] = slug.replace(/%20/g, " ");

        if (tag === "krit") vData["raga"] = slugify(raga);

        // TEST!!!
        if (movie) {
            const res = await fetch(`/api/tags?key=movi&value=${movie}&mode=name`);
            const data = await res.json();
            setMovie(data.values[0]?.name || "");
            console.log("Movie data:", data.values[0])
        }
        else {
            setMovie("");
        }
        // // console.log("Saving video with data:", vData);
        // return;

        // Add to list, send to API, etc.
        await fetch("/api/videos/tag", {
            method: "POST",
            headers: { "Content-Type": "application/json", ...await getHeader() },
            body: JSON.stringify({
                videoId: videoId,
                data: { ...vData },
                movie: movie
            }),
        }).then(async (res) => {
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
                if (movie) {
                    const res = await fetch(`/api/tags?key=movi&value=${movie}&mode=name`);
                    const data = await res.json();
                    setMovie(data.values[0]?.name || "");

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
        setMovie("");
        setSuggestions([]);
        setMessage("");
        setApiStatus({ status: 0, text: "" });
    }

    return (
        <div>
            <button
                className={`${className} btn-round-icon material-symbols-outlined text-(--primary) hover:text-(--primary)/80 transition`}
                onClick={() => {
                    if (!user) {
                        router.push(`/auth/signin${src ? `?ret=${encodeURIComponent(src)}` : ''}`);
                        return;
                    }
                    setOpen(true);
                }}
            >
                video_camera_back_add
            </button>

            <Modal
                title="Add a video"
                w="sm:max-3xl"
                isOpen={open}
                onClose={() => { cleanup() }}
                children={
                    <div className="p-4 scroll-auto ">
                        <p className=" bg-my-accent/20 p-2 ">{Tag} : {name}</p>
                        {raga && (<p className="p-2 text-sm text-(--text)/60">Raga: {raga}</p>)}
                        {/* YouTube URL */}
                        <p className="text-sm min-h-6 px-1 pb-2 text-slate-500">
                            <span > {videoId && `Video Id: ${videoId}`}</span>
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
                                    <div className="mt-4 gap-1">
                                        <input
                                            type="text"
                                            value={title}
                                            onChange={(e) => setTitle(e.target.value)}
                                            className="mt-1 w-full"
                                        />
                                        <input
                                            type="text"
                                            value={movie}
                                            placeholder="Movie / Album.."
                                            onChange={(e) => verifyMovie(e.target.value)}
                                            className="mt-1 w-full"
                                        />

                                        {suggestions.length > 0 && (
                                            <div className="absolute mt-1 menu min-h-10 min-w-50 rounded shadow right-5">
                                                {suggestions.map((s, i) => (
                                                    <div
                                                        key={i}
                                                        className="p-2 hover:bg-my-accent cursor-pointer"
                                                        onClick={() => {
                                                            setMovie(s.name);
                                                            setSuggestions([]);
                                                        }}
                                                    >
                                                        {s.name}
                                                    </div>
                                                ))}
                                            </div>
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
