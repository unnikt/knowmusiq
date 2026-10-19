"use server";
import { NextResponse } from "next/server";
import { knowmusiqAdminDB } from "@/lib/server/knowmusiqAdmin";

export async function POST(req: Request) {
    try {
        const { payload } = await req.json();
        const docId = payload.docId;
        const uid = payload.user?.uid;
        const email = payload.user?.email;

        console.log(payload, docId, uid, email);

        if (!docId && !uid && !email) {
            return NextResponse.json(
                { error: "docId, uid, and email are required" },
                { status: 400 }
            );
        }

        // Delete the video document
        const ref = knowmusiqAdminDB.collection("videos").doc(docId);
        const snap = await ref.get();

        if (!snap.exists) {
            return NextResponse.json(
                { error: `Video '${docId}' not found` },
                { status: 404 }
            );
        }

        await ref.delete();

        // Call audit logging API
        await fetch(`${process.env.NEXT_PUBLIC_SITE_URL}/api/admin/audit-log`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                action: "delete-video",
                collection: "videos",
                docId: docId,
                uid: uid,
                email: email,
            }),
        });

        return NextResponse.json({
            message: `Video '${docId}' deleted successfully`,
            deletedId: docId,
        });
    } catch (err: any) {
        return NextResponse.json(
            { error: err.message },
            { status: 500 }
        );
    }
}
