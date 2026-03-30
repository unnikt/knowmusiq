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
        <div className="searchBox">
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
            />

            <button
                onClick={handleSearch}
                className=" bg-pink-500 text-white px-5 py-2 rounded-r-md hover:bg-blue-700"
            >
                Search
            </button>
        </div>
    );
}