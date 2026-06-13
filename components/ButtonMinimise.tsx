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
        >
            {isMinimised ? (
                <span className="material-symbols-outlined">zoom_out_map</span>
            ) : (
                <span className="material-symbols-outlined">zoom_in_map</span>
            )}
        </button>
    );
}
