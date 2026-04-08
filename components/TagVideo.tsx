"use client";

import { useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { dbShruthi } from "@/lib/client/firebaseSH.client"; // adjust path

export default function VideoTagForm({ onSubmit }) {
    const [youtubeUrl, setYoutubeUrl] = useState("");
    const [youtubeId, setYoutubeId] = useState("");
    const [title, setTitle] = useState("");
    const [thumbnail, setThumbnail] = useState("");

    const [allRagas, setAllRagas] = useState([]);
    const [queryStr, setQuery] = useState("");
    const [filtered, setFiltered] = useState([]);
    const [selectedRagas, setSelectedRagas] = useState([]);

    // Load ragas from Firestore
    useEffect(() => {
        async function loadRagas() {
            const q = query(
                collection(dbShruthi, "ragas"),
                where("Name", "==", "Kalyani")
            );


            const snap = await getDocs(q);
            const list = snap.docs.map((d) => ({
                id: d.id,
                ...d.data(),
            }));
            setAllRagas(list);
        }
        loadRagas();
    }, []);

    // Extract YouTube ID from URL
    const extractId = (url: string) => {
        try {
            const u = new URL(url);
            if (u.hostname.includes("youtu.be")) {
                return u.pathname.slice(1);
            }
            return u.searchParams.get("v");
        } catch {
            return null;
        }
    };

    // Fetch metadata when URL changes
    useEffect(() => {
        const id = extractId(youtubeUrl);
        if (!id) return;

        setYoutubeId(id);

        async function fetchMetadata() {
            try {
                const res = await fetch(
                    `/api/youtube?vid=${id}` // You will create this API route
                );
                const data = await res.json();

                setTitle(data.title || "");
                setThumbnail(data.thumbnail || "");
            } catch (err) {
                console.error("Metadata fetch failed", err);
            }
        }

        fetchMetadata();
    }, [youtubeUrl]);

    // Filter ragas
    useEffect(() => {
        if (!queryStr.trim()) {
            setFiltered([]);
            return;
        }
        const q = queryStr.toLowerCase();
        setFiltered(
            allRagas.filter((r) => r.Name.toLowerCase().includes(q)).slice(0, 8)
        );
    }, [queryStr, allRagas]);

    const addRaga = (raga) => {
        if (!selectedRagas.find((r) => r.id === raga.id)) {
            setSelectedRagas([...selectedRagas, raga]);
        }
        setQuery("");
        setFiltered([]);
    };

    const removeRaga = (id) => {
        setSelectedRagas(selectedRagas.filter((r) => r.id !== id));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit({
            youtubeId,
            youtubeUrl,
            title,
            thumbnail,
            tags: {
                raga: selectedRagas.map((r) => r.Name),
            },
        });
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto bg-white rounded space-y-6"
        >
            <h2 className="text-2xl font-semibold">Tag a Video</h2>

            {/* YouTube URL */}
            <div>
                <label className="block text-sm font-medium mb-1">YouTube URL</label>
                <input
                    className="w-full border rounded p-2 focus:ring focus:ring-blue-300"
                    placeholder="Paste YouTube URL"
                    value={youtubeUrl}
                    onChange={(e) => setYoutubeUrl(e.target.value)}
                />
                {youtubeId && (
                    <p className="mt-2 text-sm text-gray-600">
                        <span className="font-medium text-gray-800">Video ID:</span> {youtubeId}
                    </p>
                )}
            </div>

            {/* Auto-filled Title */}
            <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                    className="w-full border rounded p-2 focus:ring focus:ring-blue-300"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                {title && (
                    <p className="mt-1 text-sm text-gray-600">
                        <span className="font-medium">Fetched title:</span> {title}
                    </p>
                )}

                {thumbnail && (
                    <div className="mt-4">
                        <p className="text-sm text-gray-700 mb-1 font-medium">Thumbnail Preview</p>
                        <img
                            src={thumbnail}
                            alt="YouTube thumbnail"
                            className="rounded-lg shadow-md border w-full max-w-sm"
                        />
                    </div>
                )}
            </div>

            {/* Raga Autocomplete */}
            <div className="relative">
                <label className="block text-sm font-medium mb-1">Raga</label>

                <input
                    className="w-full border rounded p-2 focus:ring focus:ring-blue-300"
                    placeholder="Type to search…"
                    value={queryStr}
                    onChange={(e) => setQuery(e.target.value)}
                />

                {filtered.length > 0 && (
                    <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow">
                        {filtered.map((r) => (
                            <li
                                key={r.id}
                                className="px-3 py-2 hover:bg-blue-100 cursor-pointer"
                                onClick={() => addRaga(r)}
                            >
                                {r.Name}
                            </li>
                        ))}
                    </ul>
                )}

                {/* Selected Ragas */}
                <div className="flex flex-wrap gap-2 mt-3">
                    {selectedRagas.map((r) => (
                        <span
                            key={r.id}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full flex items-center gap-2"
                        >
                            {r.Name}
                            <button
                                type="button"
                                onClick={() => removeRaga(r.id)}
                                className="text-red-600 hover:text-red-800"
                            >
                                ×
                            </button>
                        </span>
                    ))}
                </div>
            </div>

            {/* <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
            >
                Save Video
            </button> */}
        </form>
    );
}