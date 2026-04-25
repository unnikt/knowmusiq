"use client";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [dark, setDark] = useState<boolean | null>(null);

    // Sync initial state with DOM (prevents auto‑firing)
    useEffect(() => {
        const isDark = document.documentElement.classList.contains("dark");
        setDark(isDark);
    }, []);

    // Apply theme when user toggles
    useEffect(() => {
        if (dark === null) return; // prevent first-run flicker
        document.documentElement.classList.toggle("dark", dark);
    }, [dark]);

    if (dark === null) return null; // avoid hydration mismatch

    return (
        <button
            onClick={() => setDark(!dark)}
            className="py-4 flex justify-items-start items-center gap-2 w-full text-white rounded"
        >
            {dark ? <SunIcon className="w-5 h-5 " /> : <MoonIcon className="w-5 h-5 inline" />}
            {dark ? "Light mode" : "Dark mode"}
        </button>
    );
}
