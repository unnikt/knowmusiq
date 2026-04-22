// components/WikiNameGrabber.tsx
"use client";

import { useState } from "react";

interface GetWikiProps {
    onPageInfo: (pageid: string, name: string, thumbnail?: string) => void;
    pic?: boolean;
    className?: string;
}

export default function GetWikiName({ onPageInfo: onName, pic = false, className }: GetWikiProps) {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [showPic, setShowPic] = useState(false);

    const extractTitleFromUrl = (wikiUrl: string) => {
        try {
            const parsed = new URL(wikiUrl);
            const parts = parsed.pathname.split("/");

            const raw = parts.pop() || "";
            return decodeURIComponent(raw.replace(/_/g, " "));
        } catch {
            return null;
        }
    };

    const handleGrab = async () => {
        setError("");
        setLoading(true);

        const title = extractTitleFromUrl(url);

        if (!title) {
            setError("Invalid Wikipedia URL");
            setLoading(false);
            return;
        }

        // Optional: verify via Wikipedia API
        try {
            const api = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
                title
            )}`;

            const res = await fetch(api);
            if (!res.ok) throw new Error("Not found");

            const data = await res.json();
            if (pic && data.thumbnail?.source) {
                setThumbnail(data.thumbnail.source);
                setShowPic(true);
            }

            onName(data.pageid, data.title, data.thumbnail?.source || undefined); // send page ID, clean title, and thumbnail back to parent
        } catch {
            setError("Could not fetch Wikipedia page");
        }

        setLoading(false);
    };

    return (
        <div className={`space-y-3 ${className || ""}`} >
            <div className="searchBox">
                <input
                    type="text"
                    placeholder="Paste Wikipedia URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full bg-slate-50 focus:outline-none focus:ring focus:border-blue-300"
                />

                <button
                    onClick={handleGrab}
                    // disabled={loading}
                    className="px-4 py-2 bg-my-accent text-white  hover:bg-purple-700 text-sm"
                >
                    {/* {loading ? "Fetching..." : "Grab Name"} */}
                    Grab
                </button>

            </div>
            {showPic && <img
                alt="thumbnail"
                src={thumbnail}
                width={100}
                height={100}
                className="rounded mt-2"
            />}

            {error && <p className="text-red-600 text-sm" > {error} </p>}
        </div>
    );
}
