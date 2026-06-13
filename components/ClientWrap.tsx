"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import TagPicker from "./TagPicker";

type Props = {
    children: React.ReactNode;
    minimiseHeader?: boolean;
    restoreOnLeave?: boolean;
    noReturn?: boolean;
    returnURL?: string;
};
export default function ClientWrap({
    children,
    minimiseHeader = true,
    restoreOnLeave = true,
    noReturn = false,
    returnURL }: Props) {
    const { setMinimiseHeader } = useApp();
    const router = useRouter();
    const [search, setSearch] = useState(false);

    const handleClick = () =>
        (returnURL) ? router.push(returnURL) : router.back();

    function handleSearch(query) {
        const trimmed = query.trim();
        if (!trimmed) return;
        router.push(`/raga/${encodeURIComponent(trimmed)}`);
    }

    useEffect(() => {
        // Apply header state on mount
        setMinimiseHeader(minimiseHeader);

        // Restore when leaving page
        return () => {
            if (restoreOnLeave) setMinimiseHeader(false);
        };
    }, [minimiseHeader, restoreOnLeave, setMinimiseHeader]);

    return <>{
        <div className="wrapper px-4" >
            {/* Top Bar  */}
            <div className="flex justify-center gap-4 items-end p-1 mt-1">
                {!noReturn &&
                    <button
                        className="btn-round-icon material-symbols-outlined"
                        onClick={handleClick}
                    >
                        reply
                    </button>
                }
                <TagPicker
                    label="Find a raga"
                    pValue=""
                    tag="raga"
                    open={false}
                    onSelect={(str) => handleSearch(str)}
                />
            </div>

            {/* Main Content */}
            {children}

        </div>
    }</>;
}
