import { NextResponse } from "next/server";
import { shruthiAdmin } from "@/lib/shruthiAdmin";        // Admin SDK (Shruthi)
import { knowmusiqAdmin } from "@/lib/knowmusiqAdmin";    // Admin SDK (KnowMusic)
import { slugify } from "@/lib/slugify";

export async function GET() {

    return NextResponse.json({ message: "This endpoint is currently disabled." }, { status: 200 });

    const sCollection = "languages";  // Change this to "composers", "singers", etc. as needed
    // console.log("DEBUG: Available collections:");
    // const collections = await shruthiAdmin.listCollections();
    // collections.forEach(c => console.log(" -", c.id));
    try {
        console.log(`Fetching ${sCollection} from Shruthi...`);

        // 1. Read from Shruthi (Admin SDK)
        const snapshot = await shruthiAdmin.collection(sCollection).get();

        console.log(`Fetched ${snapshot.size} ${sCollection} from Shruthi.`);

        const rows = snapshot.docs.map(doc => {
            const d = doc.data();
            return {
                slug: slugify(d.name),  // Unique slug based on krithi name
                name: d.name,
                region: slugify(d.region || "not set"),  // Default region (can be modified based on actual data)
                idx: d.idx || d.name.toUpperCase().slice(0, 3), // Default index (can be modified based on actual data)
            };
        });

        // 2. Write to KnowMusic (Admin SDK)
        console.log("Writing to KnowMusic...");

        const batch = knowmusiqAdmin.batch();
        const colRef = knowmusiqAdmin.collection(sCollection);

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
