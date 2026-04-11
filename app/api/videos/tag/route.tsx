import { NextResponse } from "next/server";
import { knowmusiqAdminDB } from "@/lib/knowmusiqAdmin";
import { hasRights } from "@/lib/auth/hasRights";

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
        const roles = await hasRights(req, ["tagEditor"]);

        if (!roles.hasRights) {
            return NextResponse.json(
                { error: "Unauthorized!" },
                { status: 403 }
            );
        }

        // Create if not present, update only provided fields if present
        await knowmusiqAdminDB.collection("videos").doc(videoId).set(
            {
                ...data,
                videoId,
                updatedAt: Date.now(),
                user: roles.user || "unknown", // Assuming you have user authentication set up
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
