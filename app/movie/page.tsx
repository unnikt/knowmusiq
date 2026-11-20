"use client";

import AddMovie from "@/components/AddMovie";
import ClientWrap from "@/components/ClientWrap";
import TagPicker from "@/components/TagPicker";
import YearPicker from "@/components/YearPicker";
import { useUser } from "@/context/UserContext";
import getHeader from "@/lib/client/getHearder";
import { slugify } from "@/lib/string/slugify";
import { useState } from "react";

export default function MovieClient() {
    // Get user from context
    const { user, verifying } = useUser();

    const [message, setMessage] = useState("");
    const [expand, setExpand] = useState(false);
    const [movie, setMovie] = useState("");
    const [lang, setLang] = useState("");
    const [year, setYear] = useState("");
    const [showYear, setShowYear] = useState(false);
    const [dir, setDirector] = useState("");
    const [desc, setDescription] = useState("");

    function handleSelect(value: string) {
        console.log("Selected movie:", value);
    }

    function handleYearSelect(selectedYear: string) {
        setYear(selectedYear);
        setShowYear(false);
    }

    async function handleSave() {
        if (!movie) {
            setMessage("Please enter a movie name");
            return;
        }
        if (user?.uid === undefined) {
            setMessage("User not logged in");
            return;
        }

        // Create payload for API call
        const slug = slugify(movie);
        const payload = {
            db: "movies",
            doc_id: slug,
            data: {
                name: movie,
                slug: slug,
                year: year,
                dir: dir,
                desc: desc,
                lang: lang,
                idx: slug.substring(0, 3).toUpperCase(),
                updatedAt: new Date().toISOString(),
                uid: user?.uid || "unknown",
            },
        };

        setMessage("Saving movie..." + movie);
        // Call API to save movie
        fetch("/api/update", {
            method: "POST",
            headers: { "Content-Type": "application/json", ...await getHeader() },
            body: JSON.stringify(payload),
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Movie saved:", data);
                setMessage("Movie saved successfully");
            })
            .catch((error) => {
                console.error("Error saving movie:", error);
                setMessage("Error saving movie");
            });

    }

    return (
        <ClientWrap>
            <AddMovie open={expand} onCancel={() => setExpand(false)} />

            {!expand &&
                <div className="card ">
                    <TagPicker
                        key={""}
                        label={"Find movies"}
                        tag={"movi"} pValue={""}
                        hidelabel={false}
                        className="btn-primary"
                        onSelect={handleSelect} />
                    <div className="flex items-center gap-2">
                        <span className="text-gray-500">Add a new movie</span>
                        <span className="material-symbols-outlined cursor-pointer" onClick={() => setExpand(true)}>
                            add
                        </span>
                    </div>
                </div>}

        </ClientWrap>
    );
}