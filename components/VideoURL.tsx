"use client";

import { useState } from "react";
import { getVideoId } from "@/lib/video/getVideoId";

interface VideoURLProps {
    onChange: (videoId: string | null) => void;
}

export default function VideoURL({ onChange }: VideoURLProps) {
    const [videoId, setVideoId] = useState<string | null>(null);

    function handleChange(value: string) {
        const id = getVideoId(value);
        const result = id ?? null;

        setVideoId(result);
        onChange(result);
    }

    return (
        <div className="w-full my-2">
            <p className="text-sm min-h-5 pl-1 text-gray-500">
                {videoId ? `Video ID: ${videoId}` : "invalid url!"}
            </p>

            <input
                className="w-full border border-gray-300 rounded p-2 focus:ring focus:ring-blue-300"
                placeholder="Paste YouTube URL"
                onChange={(e) => handleChange(e.target.value)}
            />
        </div>
    );
}
