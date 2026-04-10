// components/WikiNameGrabber.tsx
"use client";

import { useState } from "react";

interface GetWikiProps {
    onName: (name: string) => void;
}

export default function GetWikiName({ onName }: GetWikiProps) {
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

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
            onName(data.title); // send clean title back to parent
        } catch {
            setError("Could not fetch Wikipedia page");
        }

        setLoading(false);
    };

    return (
        <div className="space-y-3" >
            <div className="searchBox">
                <input
                    type="text"
                    placeholder="Paste Wikipedia URL"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)
                    }
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
            {error && <p className="text-red-600 text-sm" > {error} </p>}
        </div>
    );
}
