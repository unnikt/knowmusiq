"use client";

import BackButton from "@/components/BackButton";
import ClientWrap from "@/components/ClientWrap";
import Link from "next/link";
import { useEffect, useState } from "react";

const legends = [
    { "name": "K. J. Yesudas", "slug": "Yesudas K J" },
    { "name": "Mohammed Rafi", "slug": "Mohammed_Rafi" },
    { "name": "Kishore Kumar", "slug": "Kishore_Kumar" },
    { "name": "S. P. Balasubrahmanyam", "slug": "S._P._Balasubrahmanyam" },
    { "name": "S. Janaki", "slug": "Janaki S" },
    { "name": "Lata Mangeshkar", "slug": "Lata_Mangeshkar" },
    { "name": "Asha Bhosle", "slug": "Asha_Bhosle" },
    { "name": "R. D. Burman", "slug": "R._D._Burman" },
    { "name": "Salil Chowdhury", "slug": "Salil_Chowdhury" },
    { "name": "Devarajan Master", "slug": "Devarajan_Master" },
    { "name": "Ilaiyaraaja", "slug": "Ilaiyaraaja" },
];

type WikiData = {
    title: string;
    extract: string;
    thumbnail?: { source: string };
    originalimage?: { source: string };
};

export default function LegendsPage() {
    const [data, setData] = useState<Record<string, WikiData>>({});
    const [loading, setLoading] = useState("loading...");

    useEffect(() => {
        async function fetchAll() {
            const results: Record<string, WikiData> = {};

            for (const leg of legends) {
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

            <main className="min-h-screen bg-linear-to-b from-sky-50 via-sky-100/60 to-orange-100 p-8! bg-fixed section-mid">
                <div className="flex flex-col align-middle">
                    <h2 className="text-4xl font-bold text-slate-700">
                        Legends of Indian Music
                    </h2>
                    {loading && <p>Loading...</p>}
                    <Link
                        href="/persons/type/Composers"
                        className="text-my-primary py-2">
                        Browse personalities
                    </Link>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

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
                                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform"
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
                                        <p className="text-sm text-gray-700 mt-2 line-clamp-4">
                                            {legend?.extract || "No summary available."}
                                        </p>
                                    </div>
                                </div>

                            </Link>
                        );
                    })}
                </div>
            </main>
        </ClientWrap>

    );
}
