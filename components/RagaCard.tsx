"use client";
import Link from "next/link";
import MinimiseButton from "@/components/MinimiseButton";
import { ordinalString } from "@/lib/string/ordinalstring";
import { slugify } from "@/lib/string/slugify";
import { useState } from "react";
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
}: RagaCardProps) {

    const slug = slugify(name); // or use slugify(name)
    const [minRaga, setMinRaga] = useState(false);


    return (
        <div className="bg-(--surface) p-4 rounded" >
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-xl font-bold ">{name}</h2>
                    <p className="text-sm">{type == "Janaka" ?
                        `${ordinalString(rid)} Melakarta raga`
                        : `Janya raga`}</p>
                </div>
                <MinimiseButton isMinimised={minRaga} setIsMinimised={setMinRaga} />
            </div>

            {parent && (
                <div className={`mt-2 ${minRaga ? "hidden" : ""}`}>
                    <Link
                        href={type == "Janaka" ? `/chakras/${parent.name}` : `/ragas/${parent.slug.toLowerCase()}`}
                        className="text-(--primary) hover:text-my-hilite text-sm font-medium"
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
        </div>
    );
}
