"use client";

import { ArrowsPointingInIcon, ArrowsPointingOutIcon } from "@heroicons/react/20/solid";

interface MinimiseButtonProps {
    isMinimised: boolean;
    setIsMinimised: (value: boolean) => void;
}

export default function MinimiseButton({ isMinimised, setIsMinimised }: MinimiseButtonProps) {
    return (
        <button
            onClick={() => setIsMinimised(!isMinimised)}
            className="p-2 rounded-full text-pink-400 hover:bg-my-hilite hover:text-white transition"
        >
            {isMinimised ? (
                <ArrowsPointingOutIcon className="h-5 w-5" />
            ) : (
                <ArrowsPointingInIcon className="h-5 w-5" />
            )}
        </button>
    );
}
