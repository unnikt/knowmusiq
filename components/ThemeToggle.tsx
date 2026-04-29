"use client";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [dark, setDark] = useState<boolean | null>(null);

    // Load saved theme OR fallback to DOM state
    useEffect(() => {
        const saved = localStorage.getItem("theme");

        if (saved === "dark") {
            document.documentElement.classList.add("dark");
            setDark(true);
            return;
        }

        if (saved === "light") {
            document.documentElement.classList.remove("dark");
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

    return (
        <button
            onClick={() => setDark(!dark)}
            className="py-4 flex items-center gap-2 w-full text-white rounded"
        >
            {dark ? <SunIcon className="w-5 h-5" /> : <MoonIcon className="w-5 h-5" />}
            {dark ? "Light mode" : "Dark mode"}
        </button>
    );
}
