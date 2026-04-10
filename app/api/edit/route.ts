import { NextResponse } from "next/server";
import { knowmusiqAdminDB } from "@/lib/knowmusiqAdmin";    // Admin SDK (KnowMusic)
import { slugify } from "@/lib/slugify";

export async function GET() {

    return NextResponse.json({ message: "This endpoint is currently disabled." }, { status: 200 });

    const sCollection = "krithis";  // Change this to "composers", "singers", etc. as needed
    // console.log("DEBUG: Available collections:");
    // const collections = await shruthiAdmin.listCollections();
    // collections.forEach(c => console.log(" -", c.id));
    try {

        // 1. Read from KnowMusic (Admin SDK)
        const snapshot = await knowmusiqAdminDB.collection(sCollection).get();

        const rows = snapshot.docs.map(doc => {
            const d = doc.data();
            return {
                slug: slugify(d.Krithi),  // Unique slug based on krithi name
                name: d.Krithi,
                raga: slugify(d.Raaga),
                tala: d.Taala,
                comp: slugify(d.Composer) || "unknown",  // Default composer (can be modified based on actual data)
                idx: d.Kindex || d.Krithi.toUpperCase().slice(0, 3), // Default index (can be modified based on actual data)
                ridx: d.Index || d.Raaga.toUpperCase().slice(0, 3), // Default index (can be modified based on actual data)
                type: d.type || "Mood",  // Default type (can be modified based on actual data)
                lang: "Carnatic",  // Default language (can be modified based on actual data)
            };
        });

        // 2. Write to KnowMusic (Admin SDK)
        const batch = knowmusiqAdminDB.batch();
        const colRef = knowmusiqAdminDB.collection(sCollection);

        rows.forEach(row => {
            const docRef = colRef.doc(row.slug);
            batch.set(docRef, row);
        });

        await batch.commit();

        return NextResponse.json({
            message: `Migrated ${rows.length} ${sCollection} successfully`,
        });

    } catch (err: any) {
        console.error(err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
