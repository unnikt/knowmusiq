"use client"
import { ArrowTurnUpLeftIcon, MagnifyingGlassPlusIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";
import { useState } from "react";
import SearchBox from "./SearchBox";

interface Props {
    children?: React.ReactNode;
    noRet?: boolean;
    ret?: string | null;
}
export default function TopBar({ children, ret, noRet }: Props) {
    const router = useRouter();
    const [search, setSearch] = useState(false);

    const handleClick = () => {
        if (ret) {
            router.push(ret);
        } else {
            router.back();
        }
    };

    return (
        <div className="topbar">
            {!noRet &&
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
            {children}

            {search && <SearchBox onClose={() => { setSearch(false); }} />}

        </div>
    );
}