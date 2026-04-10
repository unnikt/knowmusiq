"use client";

import ClientWrap from "@/components/ClientWrap";
import { useEffect, useState } from "react";

const legends = [
    "K. J. Yesudas",
    "Mohammed Rafi",
    "Kishore Kumar",
    "S. P. Balasubrahmanyam",
    "S. Janaki",
    "Lata Mangeshkar",
    "Asha Bhosle",
    "R. D. Burman",
    "Salil Chowdhury",
    "Devarajan Master",
    "Ilaiyaraaja",
];

type WikiData = {
    title: string;
    extract: string;
    thumbnail?: { source: string };
    originalimage?: { source: string };
};

export default function LegendsPage() {
    const [data, setData] = useState<Record<string, WikiData>>({});

    useEffect(() => {
        async function fetchAll() {
            const results: Record<string, WikiData> = {};

            for (const name of legends) {
                const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
                    name
                )}`;
                const res = await fetch(url);
                if (res.ok) {
                    const json = await res.json();
                    results[name] = json;
                }
            }

            setData(results);
        }

        fetchAll();
    }, []);

    return (
        <ClientWrap minimiseHeader={true}>

            <main className="min-h-screen bg-linear-to-b from-amber-100 to-orange-200 p-8">
                <h1 className="text-4xl font-bold text-center mb-8 text-amber-900">
                    Legends of Indian Music
                </h1>

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {legends.map((name) => {
                        const legend = data[name];
                        const img =
                            legend?.originalimage?.source ||
                            legend?.thumbnail?.source ||
                            "/placeholder.png";

                        return (
                            <div
                                key={name}
                                className="bg-white rounded-xl shadow-lg overflow-hidden hover:scale-105 transition-transform"
                            >
                                <img
                                    src={img}
                                    alt={name}
                                    className="w-full h-64 object-cover"
                                />
                                <div className="p-4">
                                    <h2 className="text-lg font-semibold text-amber-800">
                                        {legend?.title || name}
                                    </h2>
                                    <p className="text-sm text-gray-700 mt-2 line-clamp-4">
                                        {legend?.extract || "No summary available."}
                                    </p>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </main>
        </ClientWrap>

    );
}
