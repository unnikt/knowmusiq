"use client"
import { ArrowTurnUpLeftIcon } from "@heroicons/react/20/solid";
import { useRouter } from "next/navigation";

interface Props {
    children?: React.ReactNode;
    wipe?: boolean;
    ret?: string | null;
}
export default function TopBar({ children, ret, wipe }: Props) {
    const router = useRouter();

    const handleClick = () => {
        if (ret) {
            router.push(ret);
        } else {
            router.back();
        }
    };

    return (
        <div className="topbar">
            {!wipe && <button
                onClick={handleClick}
                className=" hover:text-purple-700 text-sm font-medium my-2"
            >
                {/* ← Back */}
                <ArrowTurnUpLeftIcon className="w-7 " />

            </button>
            }
            {children}
        </div>
    );
}