"use client";

import { useState } from "react";
import { useRouter } from "next/navigation.js";

export default function SearchBox() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    function handleSearch() {
        const trimmed = query.trim();
        if (!trimmed) return;
        router.push(`/ragas/${encodeURIComponent(trimmed)}`);
    }

    return (
        <div className="flex w-full max-w-xl my-2">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        handleSearch();
                    }
                }}
                placeholder="Search ragas..."
                className="max-w-xl px-4 py-2 border border-sky-200 rounded-l-md bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-blue-500"
            />
            <button
                onClick={handleSearch}
                className="bg-blue-600 bg-pink-500 text-white px-5 py-2   rounded-r-md hover:bg-blue-700"
            >
                Search
            </button>
        </div>
    );
}