"use client";

import { useApp } from "../context/AppContext";
import { ArrowsPointingInIcon } from "@heroicons/react/20/solid";

export default function MinimiseButton() {
    const { setMinimiseHeader } = useApp();

    function handlePlay() {
        setMinimiseHeader(prev => !prev);
    }

    return (
        <button
            onClick={handlePlay}
            className="p-2 rounded-full text-pink-400 hover:bg-my-hilite hover:text-white transition"
        >
            <ArrowsPointingInIcon className="h-5 w-5" />
        </button>
    );
}