"use client";

import ClientWrap from "@/components/ClientWrap";
import { dbShruthi } from "@/lib/client/firebaseSH.client";
import { collection, getDocs, query } from "firebase/firestore";
import { useState } from "react";

export default function MigratePage({ params }: { params: Promise<{ slug: string }> }) {

    const [results, setResults] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [source, setSource] = useState("");

    async function getData(source: string) {
        const q = query(collection(dbShruthi, source));
        const snaps = await getDocs(q);
        const data = snaps.docs.map(doc => {
            const d = doc.data();
            return {
                slug: d.slug,
                name: d.name,
                rid: d.rid,
                type: d.type,
                parent: d.parent,
                pid: d.pid,
                idx: d.idx,
                arohana: d.arohana,
                avarohana: d.avarohana,
            }
        })
        setResults(data);
        return (data);
    }



    async function handleclick(fname: string) {
        if (!source) return;

        setLoading(true);

        try {
            const data = await getData(source);

            if (!data || data.length == 0) {
                setError("No data retrieved..."); return;
            }
            downloadCSV(data);
        }
        catch (err) {
            setError("Failed to retrieve data...: " + err)
        }
        finally {
            setLoading(false)
        }

    }

    return (
        <ClientWrap minimiseHeader={true}>
            <div className="section-mid flex flex-col justify-center align-middle">
                <div className="searchBox">
                    <input type="text"
                        className="border border-my-lolite outline-0"
                        placeholder="Enter source"
                        onChange={(e) => setSource(e.target.value)}
                    />
                    <button
                        disabled={loading}
                        type="button"
                        className="px-4 bg-my-accent text-white font-medium"
                        onClick={() => handleclick("data.csv")}
                    >
                        Export CSV
                    </button>
                </div>
                <div>
                    {error && <p className="text-red-500 mb-4">{error}</p>}
                    {loading && <p>retreiving data...</p>}

                </div>
            </div>
        </ClientWrap>
    )

}

export function downloadCSV(data: any[], filename: string = "data.csv",) {
    if (!data || data.length === 0) {
        console.error("No data provided for CSV export");
        return;
    }

    // Build CSV header row
    const headers = Object.keys(data[0]).join(",");

    // Build CSV rows with proper escaping
    const rows = data.map(row =>
        Object.values(row)
            .map(v => `"${String(v).replace(/"/g, '""')}"`)
            .join(",")
    );

    const csv = [headers, ...rows].join("\n");

    // Create a downloadable Blob
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    // Trigger download
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.click();

    // Cleanup
    URL.revokeObjectURL(url);
}
