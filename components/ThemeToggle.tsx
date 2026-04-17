"use client";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
    const [dark, setDark] = useState(false);

    useEffect(() => {
        document.documentElement.classList.toggle("dark", dark);
    }, [dark]);

    return (

        <button
            onClick={() => setDark(!dark)}
            className="px-2 py-1 w-full mt-2  bg-(--surface) text-(--text) rounded"
        >
            {dark ? "Light" : "Dark"}
        </button>
    );
}
