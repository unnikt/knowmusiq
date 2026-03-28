import { NextResponse } from "next/server";
import { dbShruthi } from "@/lib/firebaseSH.client";
import { collection, getDocs, query } from "firebase/firestore";
import { knowmusiqAdmin } from "@/lib/knowmusiqAdmin";

export async function GET() {
    try {
        // 1. Read from client Firestore (Shruthi)
        const q = query(collection(dbShruthi, "ragas"));
        const snaps = await getDocs(q);

        const rows = snaps.docs.map(doc => {
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
            };
        });

        console.log("Starting batch...")
        // 2. Write to Admin Firestore (KnowMusic)
        const batch = knowmusiqAdmin.batch();
        const colRef = knowmusiqAdmin.collection("ragas");

        rows.forEach(row => {
            const docRef = colRef.doc(row.slug); // preserve ID
            batch.set(docRef, row);
        });

        await batch.commit();

        return NextResponse.json({
            message: `Migrated ${rows.length} ragas successfully`,
        });
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}
