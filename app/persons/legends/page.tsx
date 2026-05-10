"use client";

import ClientWrap from "@/components/ClientWrap";
import { Shuffle } from "@/lib/array/Shuffle";
import { Legends } from "@/lib/const/Legends";
import Link from "next/link";
import { useEffect, useState } from "react";

type WikiData = {
    title: string;
    extract: string;
    thumbnail?: { source: string };
    originalimage?: { source: string };
};

export default function LegendsPage() {
    const [data, setData] = useState<Record<string, WikiData>>({});
    const [loading, setLoading] = useState("loading...");
    const legends = Shuffle(Legends);

    useEffect(() => {
        async function fetchAll() {
            const results: Record<string, WikiData> = {};

            for (const leg of Legends) {
                const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
                    leg.name
                )}`;
                const res = await fetch(url);
                if (res.ok) {
                    const json = await res.json();
                    results[leg.name] = json;
                }
            }

            setData(results);
            setLoading(null);
        }

        fetchAll();
    }, []);

    return (
        <ClientWrap >
            <div className="min-h-screen bg-linear-to-b from-sky-50 via-sky-100/60 to-orange-100 p-8! bg-fixed">
                <h2 className="text-4xl font-bold text-slate-700">
                    Legends of Indian Music
                </h2>
                <Link
                    href="/persons/type/Composers"
                    className="text-my-primary block my-2">
                    Browse personalities
                </Link>
                {loading && <p>Loading...</p>}

                <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-4 gap-6">
                    {!loading && legends.map((leg) => {
                        const legend = data[leg.name];
                        const img =
                            legend?.originalimage?.source ||
                            legend?.thumbnail?.source ||
                            "/placeholder.png";
                        return (
                            <Link
                                key={leg.name}
                                href={`/persons/${leg.slug}`}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform"
                            >
                                <div
                                    key={leg.name}
                                    className="bg-white rounded-xl overflow-hidden hover:scale-105 transition-transform"
                                >
                                    <img
                                        src={img}
                                        alt={leg.name}
                                        className="w-full h-64 object-cover"
                                    />
                                    <div className="p-4">
                                        <h2 className="text-lg font-semibold text-amber-800">
                                            {legend?.title || leg.name}
                                        </h2>
                                        <p className="text-sm text-gray-700 mt-2 line-clamp-3">
                                            {legend?.extract || "No summary available."}
                                        </p>
                                    </div>
                                </div>

                            </Link>
                        );
                    })}
                </div>
            </div>
        </ClientWrap>

    );
}
