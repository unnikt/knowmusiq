"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";


export default function SearchBox() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    function handleSearch() {
        const trimmed = query.trim();
        if (!trimmed) return;
        router.push(`/ragas/${encodeURIComponent(trimmed)}`);
    }

    return (
        <div className="w-full flex flex-col justify-center gap-1 sm:flex-row sm:gap-0 sm:max-w-md ">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") handleSearch();
                }}
                placeholder="Search ragas..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-md sm:rounded-r-none focus:outline-none focus:ring-1 focus:ring-my-primary/80"
            />

            <button
                onClick={handleSearch}
                className="px-5 py-2 bg-pink-500 text-white rounded-md sm:rounded-l-none hover:bg-pink-600 transition"
            >
                Search
            </button>
        </div>
    );
}