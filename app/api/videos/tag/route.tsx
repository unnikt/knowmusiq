import { NextResponse } from "next/server";
import { knowmusiqAdmin } from "@/lib/knowmusiqAdmin";

export async function POST(req: Request) {
    try {
        const body = await req.json();

        const { videoId, data } = body;

        if (!videoId || !data) {
            return NextResponse.json(
                { error: "Missing videoId or data" },
                { status: 400 }
            );
        }

        // Create if not present, update only provided fields if present
        await knowmusiqAdmin.collection("videos").doc(videoId).set(
            {
                ...data,
                videoId,
                updatedAt: Date.now(),
            },
            { merge: true } // <-- MAGIC: update only required fields
        );

        return NextResponse.json({
            success: true,
            id: videoId,
        });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
