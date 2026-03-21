// app/search/page.tsx
import { shruthiDB } from "../../lib/firebase-admin";
import Link from "next/link";

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
    const { q } = await searchParams;
    const txt = q?.trim() || ""

    if (!txt) {
        return (
            <div>
                <h1>Search</h1>
                <p>q is null</p>
            </div>
        );
    }

    const snap = await shruthiDB
        .collection("ragas")
        .where("Parent", "==", q)
        .get();

    const results = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    return (
        <div>
            <h1 className="title mt-5">{q}</h1>
            {results.length === 0 && <p>No ragas found.</p>}
            <p className="subTitle">Janya ragas - {results.length}</p>
            <ul className="list">
                {results.map((raga: any) => (
                    <li key={raga.RID} className="p-1">
                        <Link href={`/ragas/${raga.slug}`}>{raga.Name}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}