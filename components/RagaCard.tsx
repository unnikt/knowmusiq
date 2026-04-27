"use client";
import Link from "next/link";
import MinimiseButton from "@/components/MinimiseButton";
import { ordinalString } from "@/lib/string/ordinalstring";
import { slugify } from "@/lib/string/slugify";
import { useState } from "react";
import ShareButton from "./ShareButton";

interface RagaCardProps {
    name: string;
    type: string;
    rid: string;
    pid: string;
    description?: string;
    arohana: string;
    avarohana: string;
    parent?: { name: string; slug: string };
    display?: string; // "krithis", "songs", "chords", etc. to conditionally render tabs or other UI elements
    onSaved?: (msg: string) => void;
}

export default function RagaCard({
    name,
    type,
    rid,
    pid,
    description,
    arohana,
    avarohana,
    parent,
    display = "videos",
}: RagaCardProps) {

    const slug = slugify(name); // or use slugify(name)
    const [minRaga, setMinRaga] = useState(false);


    return (
        <div className="bg-(--surface) p-4 rounded" >
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-2xl font-bold ">{name}</h2>
                    <p className="text-sm">{type == "Janaka" ?
                        `${ordinalString(rid)} Melakarta raga`
                        : `Janya raga`}</p>
                </div>
                <div className="flex gap-1 align-middle text-my-secondary">
                    <ShareButton
                        title="Check out this raga"
                        text="Explore this raga on musiq-me.com"
                        url={`https://musiq-me.com/ragas/${name}`}
                    />
                    <MinimiseButton isMinimised={minRaga} setIsMinimised={setMinRaga} />
                </div>
            </div>

            {parent && (
                <div className={`mt-2 ${minRaga ? "hidden" : ""}`}>
                    <Link
                        href={type == "Janaka" ? `/chakras/${parent.name}` : `/ragas/${parent.slug.toLowerCase()}`}
                        className="text-(--primary) hover:text-my-hilite border-b font-medium"
                    >
                        {type == "Janaka" ? "Chakra" : "Melakarta raga"} - {parent.name}
                    </Link>
                </div>
            )}
            {description && (
                <p className={`mt-3 text-sm  leading-relaxed h-6 ${minRaga ? "hidden" : ""}`}>
                    {description}
                </p>
            )}

            {arohana !== "" && (
                <div className={`mt-4 space-y-2 text-sm  ${minRaga ? "hidden" : ""}`}>
                    <p>
                        <span className="font-medium">Aarohana:</span> {arohana}
                    </p>
                    <p>
                        <span className="font-medium">Avarohana:</span> {avarohana}
                    </p>
                </div>
            )}

            <p className={`text-sm mt-2  text-justify ${minRaga ? "hidden" : ""}`}>
                Note: While the swaras and notes are fundamental to the raga,
                their specific arrangement, ornamentation and emotional expression
                create the unique character of a particular raga.
            </p>
            {/* 🎵 Tabs Section */}
            <div className=" mt-2 border-t-2 pt-2 border-my-secondary">
                <div className="flex gap-4 justify-start align-middle  font-medium  rounded-md">
                    <Link
                        href={`/ragas/${slug}`}
                        className={`${display == "videos" ? "bg-slate-100" : ""} px-3 py-1 rounded-md   text-emerald-700 hover:bg-emerald-50`}
                    >
                        Videos
                    </Link>
                    <Link
                        href={`/ragas/${slug}/krithis`}
                        className={`${display == "krithis" ? "bg-slate-100" : ""} px-3 py-1 rounded-md   text-sky-700 hover:bg-sky-50`}
                    >
                        Krithis
                    </Link>
                    {type === "Janaka" &&
                        <Link
                            href={`/ragas/${slug}/janya`}
                            className={`${display == "janya" ? "bg-slate-100" : ""} px-3 py-1 rounded-md   text-purple-700 hover:bg-purple-50`}
                        >
                            Janya
                        </Link>
                    }
                    <Link
                        href={`/ragas/${slug}/chords`}
                        className={`${display == "chords" ? "bg-slate-100" : ""} px-3 py-1 rounded-md   text-amber-700 hover:bg-amber-50`}
                    >
                        Chords
                    </Link>
                </div>
            </div>

        </div>
    );
}
