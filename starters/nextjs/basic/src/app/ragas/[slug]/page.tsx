import { adminDb } from "@/server/firebase-admin";

export default async function RagaPage({ params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params;


    const snap = await adminDb.collection("ragas")
        .where("slug", "==", slug)
        .limit(1)
        .get();


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