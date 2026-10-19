import { NextResponse } from "next/server";
import { knowmusiqAdminDB } from "@/lib/server/knowmusiqAdmin";

export async function POST(req: Request) {
    try {
        const { action, collection, docId, uid, email } = await req.json();

        if (!action || !collection || !docId || !uid || !email) {
            return NextResponse.json(
                { error: "action, collection, docId, uid, and email are required" },
                { status: 400 }
            );
        }

        await knowmusiqAdminDB
            .collection("admin")
            .doc("audit-logs")
            .collection("entries")
            .add({
                action,
                collection,
                docId: docId,
                uid: uid,
                email: email,
                timestamp: Date.now(),
            });

        return NextResponse.json({ message: "Audit logged" });
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}
