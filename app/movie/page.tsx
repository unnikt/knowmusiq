"use client";

import ClientWrap from "@/components/ClientWrap";
import TagPicker from "@/components/TagPicker";
import { slugify } from "@/lib/string/slugify";
import { useState } from "react";

export default function MovieClient() {
    const [expand, setExpand] = useState(false);
    const [movie, setMovie] = useState("");
    const [lang, setLang] = useState("");
    const [year, setYear] = useState("");
    const [dir, setDirector] = useState("");
    const [desc, setDescription] = useState("");

    function handleSelect(value: string) {
        console.log("Selected movie:", value);
    }

    function handleSave() {
        const doc = {
            name: { movie },
            slug: slugify(movie),
            year: year,
            dir: dir,
            desc: desc,
            lang: lang
        }
        console.log(doc);

    }

    return (
        <ClientWrap>
            <p className="text-xl mx-auto ">Movies</p>
            {!expand &&
                <div className="flex flex-col gap-2 align-bottom mt-4 w-fit mx-auto">
                    <TagPicker
                        key={""}
                        label={"Find movies"}
                        tag={"movi"} pValue={""}
                        hidelabel={false}
                        className="bg-my-secondary/80 p-2 rounded text-white w-full"
                        onSelect={handleSelect} />
                    <button
                        className="flex items-center bg-my-secondary/80 px-2 rounded text-white!"
                        onClick={() => setExpand(true)}>
                        Add a movie
                        <span className="btn-round-icon material-symbols-outlined text-white!">
                            add
                        </span>
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
                        value={movie}
                        onChange={(e) => setMovie(e.target.value)}
                    />
                    {/* lang name Input */}
                    <div className="flex items-center gap-2">
                        <TagPicker tag="lang" pValue="" label="Language"
                            hidelabel={false}
                            onSelect={(str) => setLang(str)}
                        />
                        <label className="block">
                            {lang}
                        </label>
                    </div>

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
                    <TagPicker tag="sing" pValue="" label="Director" hidelabel={false} />

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
                    <button className="btn border-0! bg-my-primary mt-2"
                        onClick={handleSave}>Save</button>
                </div>
            }

        </ClientWrap>
    );
}