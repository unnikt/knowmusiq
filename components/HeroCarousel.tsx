"use client";
import { useEffect, useState, useRef } from "react";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
} from "@heroicons/react/24/outline";

export default function HeroVideoCarousel({ videos, onSelect }) {
    const [index, setIndex] = useState(0);
    const [paused, setPaused] = useState(false);
    const progressRef = useRef(null);

    const duration = 5000; // 5 seconds per slide
    // Auto-loop
    useEffect(() => {
        if (paused) return;

        const timer = setTimeout(() => {
            setIndex((prev) => (prev + 1) % videos.length);
        }, duration);

        return () => clearTimeout(timer);
    }, [index, paused, videos.length]);

    // // Reset progress bar animation
    // useEffect(() => {
    //     if (!progressRef.current) return;
    //     progressRef.current.style.animation = "none";
    //     void progressRef.current.offsetWidth; // trigger reflow
    //     progressRef.current.style.animation = `progress ${duration}ms linear`;
    // }, [index]);

    const prevNext = (idx: number) =>
        setIndex((prev) => (prev + idx + videos.length) % videos.length);

    return (
        <div
            className="relative w-full max-w-4xl mx-auto group"
        // onMouseEnter={() => setPaused(true)}
        // onMouseLeave={() => setPaused(false)}
        >
            {/* Slide container */}
            <div className="relative h-64 sm:h-80 md:h-96 rounded-xl overflow-hidden">
                {videos.map((v, i) => (
                    <div
                        key={v.videoId}
                        className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${i === index ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                            }`}
                    >
                        <div
                            className="w-full h-full cursor-pointer relative"
                            onClick={() => onSelect?.(v)}
                        >
                            <img
                                src={`https://img.youtube.com/vi/${v.videoId}/hqdefault.jpg`}
                                alt={v.title}
                                className="w-full h-full object-cover"
                            />

                            {/* Dark overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/70 via-black/20 to-transparent" />

                            {/* Title inside image */}
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                <h2 className="text-xl sm:text-2xl font-bold drop-shadow-lg line-clamp-2">
                                    {v.title}
                                </h2>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Left Arrow */}
            <button
                onClick={() => prevNext(-1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 z-20 
                 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full 
                  group-hover:opacity-100 transition"
            >
                <ChevronLeftIcon className="w-6 h-6" />
            </button>

            {/* Right Arrow */}
            <button
                onClick={() => prevNext(1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 z-20 
                 bg-black/40 hover:bg-black/60 text-white p-2 rounded-full 
                  group-hover:opacity-100 transition"
            >
                <ChevronRightIcon className="w-6 h-6" />
            </button>

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20">
                <div
                    ref={progressRef}
                    className="h-full bg-white"
                    style={{ animation: `progress ${duration}ms linear` }}
                />
            </div>

            {/* Progress bar animation
            <style jsx>{`
        @keyframes progress {
          from {
            width: 0%;
          }
          to {
            width: 100%;
          }
        }
      `}</style> */}
        </div>
    );
}
