"use client";

import Link from "next/link";
import { PlusIcon } from "@heroicons/react/20/solid";

interface AddButtonProps {
    children?: React.ReactNode;
    href?: string;
    onClick?: () => void;
}

export default function AddButton({ children, href, onClick }: AddButtonProps) {
    const content = (
        <div className="flex items-center gap-2 px-2 py-1 min-w-25 bg-my-accent text-white rounded hover:bg-my-primary/80 transition">
            <PlusIcon className="h-5 w-5 font-bold" />
            {children}
        </div>
    );

    // If href is provided → render a Link
    if (href) {
        return (
            <Link href={href}>
                {content}
            </Link>
        );
    }

    // Otherwise → render a button
    return (
        <button onClick={onClick}>
            {content}
        </button>
    );
}
