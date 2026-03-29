"use client";

import { useState } from "react";

export default function SearchUpdatePage() {
    const [collection, setCollection] = useState("");
    const [docId, setDocId] = useState("");
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    async function searchDoc() {
        setLoading(true);
        setMessage("");

        const res = await fetch("/api/admin/search-doc", {
            method: "POST",
            body: JSON.stringify({ collection, docId }),
        });

        const json = await res.json();
        setLoading(false);

        if (json.error) {
            setMessage(json.error);
            setData(null);
        } else {
            setData(json.data);
        }
    }

    async function updateDoc() {
        setLoading(true);
        setMessage("");

        const res = await fetch("/api/admin/update-doc", {
            method: "POST",
            body: JSON.stringify({ collection, docId, data }),
        });

        const json = await res.json();
        setLoading(false);

        setMessage(json.message || json.error);
    }

    return (
        <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
            <h1 className="text-xl font-bold mb-4">Search & Update Document</h1>

            <div className="space-y-3">
                <input
                    className="w-full border p-2 rounded"
                    placeholder="Collection name (e.g., ragas)"
                    value={collection}
                    onChange={(e) => setCollection(e.target.value)}
                />

                <input
                    className="w-full border p-2 rounded"
                    placeholder="Document ID (slug)"
                    value={docId}
                    onChange={(e) => setDocId(e.target.value)}
                />

                <button
                    onClick={searchDoc}
                    className="w-full bg-sky-600 text-white py-2 rounded hover:bg-sky-700"
                >
                    {loading ? "Searching..." : "Search"}
                </button>
            </div>

            {message && <p className="mt-4 text-sm text-red-600">{message}</p>}

            {data && (
                <div className="mt-6">
                    <h2 className="font-semibold mb-2">Edit Document</h2>

                    <textarea
                        className="w-full border p-3 rounded h-40 font-mono text-sm"
                        value={JSON.stringify(data, null, 2)}
                        onChange={(e) => setData(JSON.parse(e.target.value))}
                    />

                    <button
                        onClick={updateDoc}
                        className="mt-3 w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700"
                    >
                        Update Document
                    </button>
                </div>
            )}
        </div>
    );
}
