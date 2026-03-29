import Link from "next/link";
import BackButton from "@/components/BackButton";
import MinimiseButton from "@/components/MinimiseButton";
import { ordinalString } from "@/lib/ordinalstring";

interface RagaCardProps {
    name: string;
    type: string;
    rid: string;
    pid: string;
    description?: string;
    arohana: string;
    avarohana: string;
    parent?: { name: string; slug: string };
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
    const slug = name.toLowerCase(); // or use slugify(name)

    return (
        <div className="card-new">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-600">{name}</h2>
                    <p className="text-sm text-gray-500">{type == "Janaka" ?
                        `${ordinalString(rid)} Melakarta raga`
                        : `Janya raga`}</p>
                </div>
                <MinimiseButton />
            </div>

            {parent && (
                <div className="mt-2">
                    <Link
                        href={type == "Janaka" ? `/chakras/${parent.name}` : `/ragas/${parent.slug.toLowerCase()}`}
                        className="text-my-accent hover:text-my-hilite text-sm font-medium"
                    >
                        {type == "Janaka" ? "Chakra" : "Melakarta raga"} - {parent.name}
                    </Link>
                </div>
            )}
            {description && (
                <p className="mt-3 text-sm text-gray-700 leading-relaxed h-6">
                    {description}
                </p>
            )}

            {arohana !== "" && (
                <div className="mt-4 space-y-2 text-sm text-gray-700">
                    <p>
                        <span className="font-medium">Aarohana:</span> {arohana}
                    </p>
                    <p>
                        <span className="font-medium">Avarohana:</span> {avarohana}
                    </p>
                </div>
            )}

            {/* 🎵 Tabs Section */}
            <div className="mt-6 border-t-2 pt-4 border-my-secondary">
                <div className="flex gap-4 text-sm font-medium">
                    <Link
                        href={`/ragas/${slug}/songs`}
                        className="px-3 py-1 rounded-md border border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                    >
                        Movie songs
                    </Link>
                    <Link
                        href={`/ragas/${slug}/krithis`}
                        className="px-3 py-1 rounded-md border border-sky-300 text-sky-700 hover:bg-sky-50"
                    >
                        Krithis
                    </Link>
                </div>
            </div>
        </div>
    );
}
