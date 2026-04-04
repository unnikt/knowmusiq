"use client";
import Link from "next/link";
import MinimiseButton from "@/components/MinimiseButton";
import { ordinalString } from "@/lib/ordinalstring";
import { slugify } from "@/lib/slugify";
import { useState } from "react";

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
    display,
}: RagaCardProps) {

    const slug = slugify(name); // or use slugify(name)
    const [minRaga, setMinRaga] = useState(false);
    return (
        <div className="card-new mb-0">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-600">{name}</h2>
                    <p className="text-sm text-gray-500">{type == "Janaka" ?
                        `${ordinalString(rid)} Melakarta raga`
                        : `Janya raga`}</p>
                </div>
                <MinimiseButton isMinimised={minRaga} setIsMinimised={setMinRaga} />
            </div>

            {parent && (
                <div className={`mt-2 ${minRaga ? "hidden" : ""}`}>
                    <Link
                        href={type == "Janaka" ? `/chakras/${parent.name}` : `/ragas/${parent.slug.toLowerCase()}`}
                        className="text-my-accent hover:text-my-hilite text-sm font-medium"
                    >
                        {type == "Janaka" ? "Chakra" : "Melakarta raga"} - {parent.name}
                    </Link>
                </div>
            )}
            {description && (
                <p className={`mt-3 text-sm text-gray-700 leading-relaxed h-6 ${minRaga ? "hidden" : ""}`}>
                    {description}
                </p>
            )}

            {arohana !== "" && (
                <div className={`mt-4 space-y-2 text-sm text-gray-700 ${minRaga ? "hidden" : ""}`}>
                    <p>
                        <span className="font-medium">Aarohana:</span> {arohana}
                    </p>
                    <p>
                        <span className="font-medium">Avarohana:</span> {avarohana}
                    </p>
                </div>
            )}

            <p className={`text-sm mt-2 text-slate-600 text-justify ${minRaga ? "hidden" : ""}`}>
                Note: While the swaras and notes are fundamental to the raga,
                their specific arrangement, ornamentation and emotional expression
                create the unique character of a particular raga.
            </p>
            {/* 🎵 Tabs Section */}
            <div className="mt-2 border-t-2 pt-4 border-my-secondary">
                <div className="flex gap-4 text-sm font-medium">
                    {display != "videos" &&
                        <Link
                            href={`/ragas/${slug}`}
                            className="px-3 py-1 rounded-md border border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                        >
                            Videos
                        </Link>
                    }
                    {display != "krithis" &&
                        <Link
                            href={`/ragas/${slug}/krithis`}
                            className="px-3 py-1 rounded-md border border-sky-300 text-sky-700 hover:bg-sky-50"
                        >
                            Krithis
                        </Link>}
                    {display != "chords" &&
                        <Link
                            href={`/ragas/${slug}/chords`}
                            className="px-3 py-1 rounded-md border border-amber-300 text-amber-700 hover:bg-amber-50"
                        >
                            Chords
                        </Link>}
                </div>
            </div>
        </div>
    );
}
