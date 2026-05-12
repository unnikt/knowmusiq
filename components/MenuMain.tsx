import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { useState } from "react";
import { MenuItems } from "@/lib/const/Menu";
import { XMarkIcon } from "@heroicons/react/20/solid";

interface Props {
    onClose?: () => void;
}
export default function MainMenu({ onClose }: Props) {
    const [open, setOpen] = useState(true);

    function handleClick() {
        setOpen(false);
        onClose?.();
    }

    return (
        open && (
            <div className="bg-(--surface) px-6 pt-6 fixed top-0 left-0 shadow  min-w-40 rounded-sm z-50 w-[70vw] h-screen overflow-y-auto">
                <div className="absolute right-3 pr-2">
                    <XMarkIcon
                        className="text-(--primary) w-7 h-7"
                        onClick={handleClick} />
                </div>
                <div className="flex flex-col gap-1 ">
                    {MenuItems.map(link => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={handleClick}
                            className="py-2 text-(--primary)"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
                <div className="border-t border-t-primary text-(--primary) w-full py-2 mt-2">
                </div>
                <ThemeToggle onClick={handleClick} />
            </div>
        )
    );
}
