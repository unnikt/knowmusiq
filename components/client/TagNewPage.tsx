"use client";

import { slugify } from "@/lib/string/slugify";
import { useState } from "react";
import GetWikiName from "../GetWikiName";
import { Accordion } from "./Accordion";
import getHeader from "@/lib/client/getHearder";
import { usePersonLookup } from "@/hooks/usePersonLookup";
import { Button } from "@headlessui/react";
import { useUser } from "@/context/UserContext";

const TAG_TYPES = [
    "Composer",
    "Singer",
    "Lyricist",
    "Movie",
    "Raga",
    "Tala",
    "Tempo",
    "Mood",
];

export default function TagNewPage() {
    const { user, verifying } = useUser();
    const [tagType, setTagType] = useState("Composer");
    const [tagValue, setTagValue] = useState("");
    const [pageid, setPageid] = useState("");
    const [thumbnail, setThumbnail] = useState("");
    const [gender, setGender] = useState("Male");
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState("");
    const { results, loading, search } = usePersonLookup();

    function saveInfo(pageid: string, name: string, thumbnail?: string) {
        setPageid(pageid);
        setTagValue(name);
        setThumbnail(thumbnail);
        setMessage("");
    }

    async function handleSave() {
        setMessage("");
        if (!tagType || !tagValue) return;

        const src = ["Composer", "Singer", "Lyricist"].includes(tagType) ? "persons" : null;
        console.log("Determined src:", src, tagType);

        if (!src) {
            setMessage("Tag type cannot be saved yet...");
            return;
        }
        setSaving(true);
        const doc_id = slugify(tagValue);

        const body = {
            db: src,
            doc_id: doc_id,
            data: {
                name: tagValue,
                type: tagType.slice(0, 4).toLowerCase(), // e.g. "comp" for "Composer" 
                idx: tagValue.toUpperCase().slice(0, 3), // first 3 letters for indexing
                slug: doc_id,
                gender: gender,
                wiki: tagValue, // Wikipedia title 
                pageid: pageid, // Wikipedia pageid
                thumbnail: thumbnail, // Wikipedia thumbnail
                updatedAt: new Date().toISOString(),
                user: user?.email || "Guest",
            },
        };

        // TODO: Save to Firestore
        // await addDoc(collection(db, "tags"), { type: tagType, value: tagValue });
        await fetch("/api/update", {
            method: "POST",
            headers: { "Content-Type": "application/json", ...await getHeader() },
            body: JSON.stringify(body),
        }).then((res) => {
            if (!res.ok) {
                setMessage("Error saving tag");
                throw new Error("Failed to save video");
            }
            else {
                setMessage(`${tagType}: ${tagValue} saved`);
            }
        }).catch((err) => {
            console.error(err);
            setMessage("Error saving tag: " + err.message);
        });

        setSaving(false);
        setTagType("");
        setTagValue("");
    }

    return (
        <div className="max-w-lg mx-2 sm:mx-auto p-4 bg-(--surface) rounded">
            <h2 className="title">Add New Tag</h2>

            <Accordion title="Grab from Wikipedia?">
                <label className="block text-sm font-medium">
                    People tags only, e.g. composers, singers, lyricists
                </label>
                <GetWikiName
                    onPageInfo={(pageid, name, thumbnail) => { saveInfo(pageid, name, thumbnail) }} pic={true} />
            </Accordion>

            {/* Tag Value Input */}
            <label className="block text-sm font-medium">
                Tag Value
            </label>
            <input
                className="w-full mt-1 border border-gray-400 rounded p-2"
                placeholder="Enter value"
                value={tagValue}
                onChange={(e) => setTagValue(e.target.value)}
            />

            {/* Tag Type Dropdown */}
            <label className="block text-sm mt-2 font-medium ">
                Tag Type
            </label>
            <select
                className="w-full mt-1 outline-0 border border-gray-400 rounded p-2 bg-white text-slate-800"
                value={tagType}
                onChange={(e) => setTagType(e.target.value)}
            >
                <option value="">Select tag type</option>
                {TAG_TYPES.map((t) => (
                    <option key={t} value={t}>
                        {t}
                    </option>
                ))}
            </select>

            <Button
                onClick={() => { search(tagValue).then(res => console.log("Results:", results)).catch(err => console.log(err)) }}
                disabled={loading}
                className="mt-2 btn hidden"
            >
                {loading ? "Searching..." : "Search Wikipedia"}
            </Button>

            <div className="flex items-center gap-6 my-1 p-2 rounded">
                {["Male", "Female", "Other"].map((g) => (
                    <label key={g} className="flex items-center gap-2 cursor-pointer text-(--text) ">
                        <input
                            type="radio"
                            name="gender"
                            value={g}
                            checked={gender === g}
                            onChange={(e) => setGender(e.target.value)}
                            className="h-4 w-4 text-(--primary) focus:ring-(--primary)"
                        />
                        <span >{g}</span>
                    </label>
                ))}
            </div>

            {/* Save Button */}
            <div className="flex items-center ">
                <button
                    onClick={handleSave}
                    disabled={saving || !tagType || !tagValue}
                    className="btn bg-my-primary w-1/3 text-white  disabled:bg-gray-400"
                >
                    {saving ? "Saving..." : "Save Tag"}
                </button>
                {message && <p className="text-green-600">{message} </p>}
            </div>

            {!verifying && <p className="mt-2 italic">Your email id {user?.email || "Guest"} will be saved with the tag</p>}
        </div >
    );
}
