"use client";

import { useEffect, useState } from "react";
import { useApp } from "@/context/AppContext";
import { useRouter } from "next/navigation";
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
                        className="btn-material-icon material-symbols-outlined"
                        onClick={handleClick}
                    >
                        reply
                    </button>
                }
                <button
                    className="btn-material-icon material-symbols-outlined"
                    onClick={() => setSearch(true)}
                >
                    search
                </button>
                {search && <SearchBox onClose={() => { setSearch(false); }} />}
            </div>

            {/* Main Content */}
            {children}

        </div>
    }</>;
}
