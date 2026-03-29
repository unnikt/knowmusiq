

"use client";

import { useApp } from "../context/AppContext";
import { ArrowsPointingOutIcon } from "@heroicons/react/20/solid";

export default function MaximizeButton() {
    const { setMinimiseHeader } = useApp();

    function handlePlay() {
        setMinimiseHeader(prev => !prev);
    }

    return (
        <button
            onClick={handlePlay}
            className="p-2 rounded-full text-pink-400 hover:bg-my-hilite hover:text-white transition"
        >
            <ArrowsPointingOutIcon
                className={`w-5 h-5`}
            />
        </button>
    );
}