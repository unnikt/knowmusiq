"use client";

import { useRef, useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";

export default function VideoSlider({ children }: { children: React.ReactNode }) {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(false);

    const updateScrollState = () => {
        const el = scrollRef.current;
        if (!el) return;

        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth);
    };

    useEffect(() => {
        updateScrollState();
        const el = scrollRef.current;
        if (!el) return;

        el.addEventListener("scroll", updateScrollState);
        window.addEventListener("resize", updateScrollState);

        return () => {
            el.removeEventListener("scroll", updateScrollState);
            window.removeEventListener("resize", updateScrollState);
        };
    }, []);

    const scrollByAmount = (amount: number) => {
        scrollRef.current?.scrollBy({ left: amount, behavior: "smooth" });
    };

    return (
        <div className="relative w-full ">
            {canScrollLeft && (
                <button
                    onClick={() => scrollByAmount(-300)}
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-10 
                     bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                >
                    <ChevronLeftIcon className="w-6 h-6" />
                </button>
            )}

            <div
                ref={scrollRef}
                className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth px-2"
            >
                {children}
            </div>

            {canScrollRight && (
                <button
                    onClick={() => scrollByAmount(300)}
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-10 
                     bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
                >
                    <ChevronRightIcon className="w-6 h-6" />
                </button>
            )}
        </div>
    );
}
