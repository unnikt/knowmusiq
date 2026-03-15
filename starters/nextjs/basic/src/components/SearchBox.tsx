"use client";

import { useState } from "react";
import { useRouter } from "next/navigation.js";

export default function SearchBox() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    function handleSearch() {
        const trimmed = query.trim();
        if (!trimmed) return;
        router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    }

    return (
        <div className="flex gap-3 w-full max-w-xl">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search ragas..."
                className="w-full max-w-xl px-4 py-2 border border-gray-300 rounded-lg bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 shadow-sm"
            />
            <button
                onClick={handleSearch}
                className="bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
            >
                Search
            </button>
        </div>
    );
}