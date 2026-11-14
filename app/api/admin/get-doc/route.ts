import { NextResponse } from "next/server";
import { getKnowmusiqAdminDB } from "@/lib/server/knowmusiqAdmin";

export async function POST(req: Request) {
    try {
        const { collection, docId } = await req.json();

        if (!collection || !docId) {
            return NextResponse.json(
                { error: "collection and docId are required" },
                { status: 400 }
            );
        }

        const snap = await (await getKnowmusiqAdminDB())
            .collection(collection)
            .doc(docId)
            .get();

        if (!(await snap).exists) {
            return NextResponse.json(
                { error: `Document '${docId}' not found in '${collection}'` },
                { status: 404 }
            );
        }

        return NextResponse.json({
            data: (await snap).data(),
            id: (await snap).id,
        });
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}
