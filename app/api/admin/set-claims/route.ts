import { NextResponse } from "next/server";
import { knowmusiqAdminAuth } from "@/lib/knowmusiqAdmin";

export async function POST(req: Request) {
    try {
        const { uid, claims } = await req.json();

        if (!uid || !claims) {
            return NextResponse.json(
                { error: "Missing uid or claims" },
                { status: 400 }
            );
        }

        await knowmusiqAdminAuth.setCustomUserClaims(uid, claims);

        return NextResponse.json({
            success: true,
            message: `Claims updated for ${uid}`,
        });
    } catch (err: any) {
        console.error("set-claims error:", err);
        return NextResponse.json(
            { error: err.message || "Failed to set claims" },
            { status: 500 }
        );
    }
}
