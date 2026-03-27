import Link from "next/link";
import PlayButton from "./MinimiseButton";
import BackButton from "@/components/BackButton";
import MinimiseButton from "@/components/MinimiseButton";

interface RagaCardProps {
    name: string;
    type: string;
    description?: string;
    arohana: string;
    avarohana: string;
    parent?: { name: string; slug: string };
}

export default function RagaCard({
    name,
    type,
    description,
    arohana,
    avarohana,
    parent,
}: RagaCardProps) {
    return (
        <div className="mb-6 rounded-xl border border-sky-200 bg-white p-5 shadow-sm hover:shadow-md transition min-w-[320px]">
            <div className="flex items-start justify-between">
                <div>
                    <h2 className="text-xl font-bold text-gray-600">{name}</h2>
                    <p className="text-sm text-gray-500">{type}</p>
                </div>
                <MinimiseButton />

            </div>

            {description && (
                <p className="mt-3 text-sm text-gray-700 leading-relaxed h-6">
                    {description}
                </p>
            )}

            {parent && (
                <div className="mt-2">
                    {parent.name ?
                        <Link
                            href={`/ragas/${parent.slug.toLowerCase()}`}
                            className="text-my-accent hover:text-my-hilite text-sm font-medium"
                        >
                            Parent Raga: {parent.name}
                        </Link>
                        : <BackButton />
                    }
                </div>
            )}
            {arohana != "" && <div className="mt-4 space-y-2 text-sm text-gray-700">
                <p><span className="font-medium">Aarohana:</span> {arohana}</p>
                <p><span className="font-medium">Avarohana:</span> {avarohana}</p>
            </div>}

        </div>
    );
}