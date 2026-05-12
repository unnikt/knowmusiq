"use client";
import { MoonIcon } from "@heroicons/react/20/solid";
import { SunIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

interface Props {
    onClick?: () => void;
}
export default function ThemeToggle({ onClick }: Props) {
    const [dark, setDark] = useState<boolean | null>(null);

    // Load saved theme OR fallback to DOM state
    useEffect(() => {
        const saved = localStorage.getItem("theme");

        if (saved === "dark") {
            document.documentElement.classList.remove("light");
            document.documentElement.classList.add("dark");
            setDark(true);
            return;
        }

        if (saved === "light") {
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.add("light");
            setDark(false);
            return;
        }

        // No saved theme → sync with DOM (your original logic)
        const isDark = document.documentElement.classList.contains("dark");
        setDark(isDark);
    }, []);

    // Apply theme + persist
    useEffect(() => {
        if (dark === null) return;

        document.documentElement.classList.toggle("dark", dark);
        localStorage.setItem("theme", dark ? "dark" : "light");
    }, [dark]);

    if (dark === null) return null; // avoid hydration mismatch


    function handleClick() {
        console.log("Toggle clicked");
        // onClick?.();
        setDark(prev => !prev);
    }


    return (
        <button
            onClick={handleClick}
            className="py-4 flex items-center gap-2 w-full text-(--primary) rounded"
        >
            {dark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            {dark ? "Light" : "Dark"}
        </button>
    );
}
