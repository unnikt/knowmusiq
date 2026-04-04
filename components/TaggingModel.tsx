"use client";

import { useState } from "react";

interface TaggingModal {
    KEYS: string[];
}

export default function TaggingModal({ KEYS }: TaggingModal) {
    if (!KEYS || KEYS.length === 0) return null;
    const TagMap = {
        "Composer": "person", "Movie": "movie", "Language": "language", "Raga": "raga", "Tala": "tala",
    }

    const [tagType, setTagType] = useState(KEYS[0]);
    const [query, setQuery] = useState("");
    const [suggestions, setSuggestions] = useState<string[]>([]);
    const [tags, setTags] = useState<{ type: string; value: string }[]>([]);


    function handleAddTag(value: string) {
        if (!value.trim()) return;

        setTags((prev) => [...prev, { type: tagType, value }]);
        setQuery("");
        setSuggestions([]);
    }

    function handleAutocomplete(value: string) {
        setQuery(value);

        // Fake autocomplete for now — replace with Firestore or your raga list
        if (value.length < 3) setSuggestions([]);
        else {
            setSuggestions([
                value + " 1",
                value + " 2",
                value + " 3",
            ]);
        }
    }
    function removeTag(index: number) {
        setTags((prev) => prev.filter((_, i) => i !== index));
    }

    return (
        <div className="space-y-4">
            {/* Title */}
            <h2 className="text-xl font-semibold">Add tags</h2>

            {/* Tag type dropdown */}
            <div>
                <label className="block text-sm mb-1 text-gray-600">Key</label>
                <select
                    className="w-full border rounded p-2"
                    value={tagType}
                    onChange={(e) => setTagType(e.target.value)}
                >
                    {KEYS.map((t) => (
                        <option key={t} value={t}>
                            {t}
                        </option>
                    ))}
                </select>
            </div>

            {/* Autocomplete input */}
            <div className="relative">
                <label className="block text-sm mb-1 text-gray-600">Value</label>
                <input
                    className="w-full border rounded p-2"
                    placeholder="Start typing…"
                    value={query}
                    onChange={(e) => handleAutocomplete(e.target.value)}
                />

                {/* Suggestions */}
                {suggestions.length > 0 && (
                    <div className="absolute z-10 bg-white border rounded w-full mt-1 shadow">
                        {suggestions.map((s) => (
                            <div
                                key={s}
                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                onClick={() => handleAddTag(s)}
                            >
                                {s}
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Added tags */}
            <div className="min-h-30">
                <h3 className="font-medium mb-2">Tags added</h3>
                <div className="flex flex-wrap gap-2">
                    {tags.map((t, i) => (
                        <span
                            key={i}
                            className="flex items-center gap-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
                        >
                            {t.type}: {t.value}

                            {/* Delete button */}
                            <button
                                onClick={() => removeTag(i)}
                                className="text-blue-700 hover:text-red-600 font-bold"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}
