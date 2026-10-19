"use client";

import TagPicker from "@/components/TagPicker";
import { deSlug } from "@/lib/string/deSlugify";
import { slugify } from "@/lib/string/slugify";
import { useState, useEffect } from "react";
import { toCamelCase } from "@/lib/string/camelcase";

export default function SearchUpdatePage() {
    const [configEdits, setConfigEdits] = useState<Record<string, string[]>>({});
    const [collections, setCollections] = useState<string[]>([]);
    const [collection, setCollection] = useState("");
    const [editableFields, setEditableFields] = useState<string[]>([]);
    const [docId, setDocId] = useState("");
    const [data, setData] = useState<any>(null);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    // Load list of collections
    useEffect(() => {
        async function loadCollections() {
            const res = await fetch("/api/admin/config-edits");
            const json = await res.json();
            if (json.data) {
                setConfigEdits(json.data);
                setCollections(Object.keys(json.data));
                setCollection(Object.keys(json.data)[0] || "");
            }
        }
        loadCollections();
    }, []);

    // Load editable fields for selected collection
    useEffect(() => {
        async function loadFields() {
            if (!collection) return;
            // const res = await fetch(`/api/admin/config-edits/${collection}`);
            // const json = await res.json();
            const fields = configEdits[collection] || [];

            if (fields) {
                setEditableFields(fields);
            } else {
                setEditableFields([]);
            }
        }

        loadFields();
    }, [collection]);

    useEffect(() => {
        if (!docId || !collection) return;
        searchDoc();
    }, [docId, collection]);


    async function searchDoc() {
        setLoading(true);
        setMessage("Fetching " + docId + " from " + collection + "...");

        const res = await fetch("/api/admin/get-doc", {
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
            setMessage("");
        }
    }

    async function updateDoc() {
        setLoading(true);
        setMessage("");

        // Build update object only with editable fields
        const updatePayload: Record<string, any> = {};
        editableFields.forEach((field) => {
            updatePayload[field] = data[field];
        });

        const res = await fetch("/api/admin/update-doc", {
            method: "POST",
            body: JSON.stringify({ collection, docId, data: updatePayload }),
        });

        const json = await res.json();
        setLoading(false);

        setMessage(json.message || json.error);
    }

    return (
        <div className="max-w-xl mx-auto p-6 rounded-xl shadow">
            <h3 className="text-xl font-bold mb-4">Update document</h3>

            <div className="space-y-3">
                {/* Dropdown for collections */}
                <p>Select a database</p>
                <div className="flex  gap-2">
                    <select
                        className="w-full border p-2 rounded"
                        value={collection}
                        onChange={(e) => setCollection(e.target.value)}
                    >
                        {collections.map((col) => (
                            <option key={col} value={col} className="text-gray-700">
                                {col}
                            </option>
                        ))}
                    </select>
                    <TagPicker
                        label="Search"
                        hidelabel={true}
                        hideicon={true}
                        tag={"comp"}
                        pValue={deSlug("" + docId)}
                        onSelect={(value) => {
                            setDocId(slugify(value))
                        }} />
                </div>
                {/* {
                    docId && <span className="text-gray-600">fetching {docId} from {collection}</span>
                } */}
            </div>

            {message && <p className="mt-4 text-sm">{message}</p>}

            {/* Editable fields */}
            {data && editableFields.length > 0 && (
                <div className="mt-6 space-y-1 ">
                    <h2 className="font-semibold mb-2">Edit Fields</h2>

                    {editableFields.map((field) => (
                        <div
                            key={field}
                            className="flex flex-row flex-wrap items-center   p-2 rounded"
                        >
                            {/* Label column */}
                            <div className="min-w-20">
                                <label className="block font-medium p-2">{toCamelCase(field)}</label>
                            </div>

                            {/* Input column */}
                            <input
                                className="border! p-2 rounded border-gray-300 focus:border-sky-500 focus:ring focus:ring-sky-200 focus:ring-opacity-50"
                                value={data[field] ?? ""}
                                onChange={(e) =>
                                    setData({ ...data, [field]: e.target.value })
                                }
                            />
                        </div>
                    ))}

                    <button
                        onClick={updateDoc}
                        className="mt-3 w-full bg-emerald-600 text-white py-2 rounded hover:bg-emerald-700"
                    >
                        Update Document
                    </button>
                </div>
            )}

            {/* If no editable fields configured */}
            {data && editableFields.length === 0 && (
                <p className="mt-4 text-sm text-yellow-600">
                    No editable fields configured for this collection.
                </p>
            )}
        </div>
    );
}
