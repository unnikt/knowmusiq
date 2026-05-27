"use client";
import Link from "next/link";
import MinimiseButton from "@/components/ButtonMinimise";
import { ordinalString } from "@/lib/string/ordinalstring";
import { slugify } from "@/lib/string/slugify";
import { useState } from "react";
import ShareButton from "./ButtonShare";
import { PencilSquareIcon } from "@heroicons/react/20/solid";
import AddVideo from "./AddVideo";

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
    onSaved
}: RagaCardProps) {

    const slug = slugify(name); // or use slugify(name)
    const [minRaga, setMinRaga] = useState(false);
    const [expDescription, setExpDesc] = useState(false);

    return (
        <div className=" rounded-xl" >
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="title">{name}</h2>
                    <p className="text-sm">{type == "Janaka" ?
                        `${ordinalString(rid)} Melakarta raga`
                        : `Janya raga`}</p>
                </div>
                <div className="flex gap-1 items-center text-my-secondary">
                    <Link
                        href={`/raga/${slug}/edit`}
                        className="p-2">
                        <PencilSquareIcon className="w-5 text-(--primary)" />
                    </Link>
                    <ShareButton
                        title={`Check out raga - ${name}`}
                        text="Explore this raga on musiq-me.com"
                        url={`https://musiq-me.com/raga/${name}`}
                    />
                    <MinimiseButton isMinimised={minRaga} setIsMinimised={setMinRaga} />
                </div>
            </div>

            {parent && (
                <div className={`mt-2 ${minRaga ? "hidden" : ""}`}>
                    <Link
                        href={type == "Janaka" ? `/chakras/${parent.name}` : `/raga/${parent.slug.toLowerCase()}`}
                        className="text-(--primary) hover:text-my-hilite border-b font-medium"
                    >
                        <div className="flex items-center">Parent: {parent.name}</div>
                    </Link>
                </div>
            )}
            {description && (
                <p
                    className={`mt-3 max-h-90 leading-relaxed text-justify  border-b 
                        ${expDescription ? "overflow-y-auto text-(--primary) scale-105 w-[90vw] mx-auto" : "text-sm text-(--primary)/60 line-clamp-2"} ${minRaga ? "hidden" : ""}`}
                    onClick={() => setExpDesc(prev => !prev)}>
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

            <p className={` mt-3 text-sm italic text-justify text-slate-500   ${minRaga ? "hidden" : ""}`}>
                Note: While the swaras and notes are fundamental to the raga, their specific arrangement, ornamentation and emotional expression create the unique character of a particular raga
            </p>
            {/* 🎵 Tabs Section */}
            <div className="flex justify-between items-center mt-2 border-t-2 pt-2 border-my-secondary">
                <div className="flex flex-wrap gap-1 justify-start align-middle  font-medium  rounded-md">
                    <Link
                        href={`/raga/${slug}`}
                        className={`${display == "videos" ? "bg-slate-100" : ""} px-3 py-1 rounded-md   text-emerald-700 hover:bg-emerald-50`}
                    >
                        Videos
                    </Link>
                    <Link
                        href={`/raga/${slug}/krithis`}
                        className={`${display == "krithis" ? "bg-slate-100" : ""} px-3 py-1 rounded-md   text-sky-700 hover:bg-sky-50`}
                    >
                        Krithis
                    </Link>
                    {type === "Janaka" &&
                        <Link
                            href={`/raga/${slug}/janya`}
                            className={`${display == "janya" ? "bg-slate-100" : ""} px-3 py-1 rounded-md   text-purple-700 hover:bg-purple-50`}
                        >
                            Janya
                        </Link>
                    }
                    <Link
                        href={`/raga/${slug}/chords`}
                        className={`${display == "chords" ? "bg-slate-100" : ""} px-3 py-1 rounded-md   text-amber-700 hover:bg-amber-50`}
                    >
                        Chords
                    </Link>
                </div>
                <AddVideo slug={slug} name={name} type={"raga"} onSaved={onSaved} src={`/raga/${slug}`} />
            </div>

        </div>
    );
}
