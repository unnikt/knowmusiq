import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import { useEffect, useState } from "react";
import { AdminMenu, UserMenu } from "@/lib/const/Menu";
import { XMarkIcon } from "@heroicons/react/20/solid";
import { useUser } from "@/hooks/useUser";

interface Props {
    onClose?: () => void;
}
export default function MainMenu({ onClose }: Props) {
    const [open, setOpen] = useState(true);
    const [isAdmin, setAdmin] = useState(false);
    const { user, loading, rights } = useUser();

    useEffect(() => {
        if (loading) return;
        if (user && rights.includes('admin')) setAdmin(true);
    })

    function handleClick() {
        setOpen(false);
        onClose?.();
    }

    return (
        open && (
            <div className="bg-(--surface) px-6 pt-6 fixed top-0 left-0 shadow  min-w-40 z-50 w-[70vw] h-screen overflow-y-auto">
                <div className="flex justify-between border-b border-b-(--text)/40 mb-3">
                    <p className="text-(--text)/70">Menu</p>
                    <XMarkIcon
                        className="text-(--primary) w-7 h-7"
                        onClick={handleClick} />
                </div>
                <div className="flex flex-col gap-3 ">
                    {UserMenu.map(link => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={handleClick}
                            className="text-(--primary)"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>

                <ThemeToggle onClick={handleClick} />

                {isAdmin &&
                    <div className="mt-2">
                        <div className="flex justify-between border-b border-b-(--text)/40 mb-3">
                            <p className="text-(--text)/70">Admin menu</p>
                        </div>
                        <div className="flex flex-col gap-3 ">
                            {AdminMenu.map(link => (
                                <Link
                                    key={link.name}
                                    href={link.href}
                                    onClick={handleClick}
                                    className="text-(--primary)"
                                >
                                    {link.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                }
            </div>
        )
    );
}
