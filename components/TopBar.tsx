"use client"
import { useRouter } from "next/navigation";

interface TopBarProps {
    children?: React.ReactNode;
    ret?: string | null;
}
export default function TopBar({ children, ret }: TopBarProps) {
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
            <button
                onClick={handleClick}
                className="text-(--primary) hover:text-purple-700 text-sm font-medium my-2"
            >
                ← Back
            </button>

            {children}
        </div>
    );
}