import { NextResponse } from "next/server";
import { knowmusiqAdminDB } from "@/lib/server/knowmusiqAdmin";

export async function POST(req: Request) {
    try {
        const { collection, docId } = await req.json();

        if (!collection || !docId) {
            return NextResponse.json(
                { error: "collection and docId are required" },
                { status: 400 }
            );
        }

        const snap = await knowmusiqAdminDB
            .collection(collection)
            .doc(docId)
            .get();

        if (!snap.exists) {
            return NextResponse.json(
                { error: `Document '${docId}' not found in '${collection}'` },
                { status: 404 }
            );
        }

        return NextResponse.json({
            data: snap.data(),
            id: snap.id,
        });
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}
