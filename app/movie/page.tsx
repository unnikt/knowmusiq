"use client";

import ClientWrap from "@/components/ClientWrap";
import TagPicker from "@/components/TagPicker";
import { useState } from "react";

export default function MovieClient() {
    const [expand, setExpand] = useState(false);
    const [name, setName] = useState("");
    const [year, setYear] = useState("");
    const [dir, setDirector] = useState("");
    const [desc, setDescription] = useState("");

    function handleSelect(value: string) {
        console.log("Selected movie:", value);
    }
    return (
        <ClientWrap>
            <p className="text-xl">Movies</p>
            {!expand && <div className="flex gap-2 align-bottom mt-4">
                <span className="p-2 bg-(--surface) rounded-md text-(--primary)">
                    <TagPicker
                        key={""}
                        label={"Find movies"}
                        tag={"movi"} pValue={""}
                        onSelect={handleSelect} />
                </span>
                <button
                    className="btn-material-icon material-symbols-outlined"
                    onClick={() => setExpand(true)}>
                    add
                </button>
            </div>}
            {expand &&
                <div className="bg-(--surface) p-4 rounded my-2 flex flex-col gap-2 justify-center">
                    <button
                        onClick={() => setExpand(false)}
                        className="material-symbols-outlined"
                    >
                        close
                    </button>
                    {/* Movie name Input */}
                    <label className="block text-sm">
                        Name
                    </label>
                    <input
                        className="w-full border border-gray-400 rounded p-2"
                        placeholder="Enter value"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    {/* Year */}
                    <label className="block text-sm">
                        Year
                    </label>
                    <input
                        className="w-full border border-gray-400 rounded p-2"
                        placeholder="Enter value"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                    {/* Director */}
                    <label className="block text-sm">
                        Director
                    </label>
                    <input
                        className="w-full border border-gray-400 rounded p-2"
                        placeholder="Enter value"
                        value={dir}
                        onChange={(e) => setDirector(e.target.value)}
                    />
                    {/* Description */}
                    <label className="block text-sm">
                        Description
                    </label>
                    <input
                        className="w-full border border-gray-400 rounded p-2"
                        placeholder="Enter value"
                        value={desc}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button className="btn border-0! bg-my-primary mt-2">Save</button>
                </div>
            }

        </ClientWrap>
    );
}