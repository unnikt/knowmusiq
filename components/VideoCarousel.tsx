"use client";
import { useEffect, useState } from "react";

export default function SingleVideoCarousel({ videos, onSelect }) {
    const [index, setIndex] = useState(0);

    // Auto-loop every 4 seconds
    useEffect(() => {
        const interval = setInterval(() => {
            setIndex((prev) => (prev + 1) % videos.length);
        }, 4000);

        return () => clearInterval(interval);
    }, [videos.length]);

    const video = videos[index];

    return (
        <div className="relative w-full max-w-3xl mx-auto">
            {/* Fade animation container */}
            <div className="relative h-56 sm:h-72 md:h-80 rounded-xl overflow-hidden">
                {videos.map((v, i) => (
                    <div
                        key={v.videoId}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === index ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <div
                            className="w-full h-full cursor-pointer"
                            onClick={() => onSelect?.(v)}
                        >
                            <img
                                src={`https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg`}
                                alt={v.title}
                                className="w-full h-full object-cover"
                            />
                        </div>
                    </div>
                ))}
            </div>

            {/* Title */}
            <p className="mt-3 text-lg font-semibold line-clamp-2 text-gray-900">
                {video.title}
            </p>
        </div>
    );
}
