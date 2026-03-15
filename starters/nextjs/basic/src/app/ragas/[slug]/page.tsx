import { db } from "@/lib/firebase";
import { collection, limit, query, where, getDocs } from "firebase/firestore";
export default async function RagaPage({ params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params;

    const q = query(collection(db, "ragas"), where("slug", "==", slug), limit(1));

    const snap = await getDocs(q);

    if (snap.empty) {
        return <div>Raga <strong>{slug}</strong> not found...</div>;
    }

    const raga = snap.docs[0].data();

    return (
        <div>
            <h1>{raga.Name}</h1>
            <p>{raga.Type} Raga</p>
            <p>Parent: {raga.Parent}</p>
            <p>Arohana: {raga.Arohana}</p>
            <p>Arohana: {raga.Avarohana}</p>
        </div>
    );
}