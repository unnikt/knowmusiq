"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { ArrowTurnUpLeftIcon, MagnifyingGlassPlusIcon } from "@heroicons/react/20/solid";
import SearchBox from "./SearchBox";

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
            <div className="topbar">
                {!noReturn &&
                    <button
                        onClick={handleClick}
                        className=" text-sm my-2"
                    >
                        {/* ← Back */}
                        <ArrowTurnUpLeftIcon className="w-7" />
                    </button>
                }
                <button
                    className=" text-sm my-2"
                    onClick={() => setSearch(true)}
                >
                    <MagnifyingGlassPlusIcon className="w-7  hover:text-my-hilite hover:scale-110 transition" />
                </button>
                {search && <SearchBox onClose={() => { setSearch(false); }} />}
            </div>

            {/* Main Content */}
            {children}

        </div>
    }</>;
}
