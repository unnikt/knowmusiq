"use client";
import { MoonIcon, SunIcon } from "@heroicons/react/20/solid";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
    }, [dark]);

    return (

        <button
            onClick={() => setDark(!dark)}
            className="p-2 w-full  text-white rounded"
        >
            {dark ? <SunIcon className="w-7 h-7 inline" /> : <MoonIcon className="w-7 h-7 inline" />}
        </button>
    );
}
