import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { knowmusiqAdminAuth, knowmusiqAdminDB } from "@/lib/server/knowmusiqAdmin";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const field = searchParams.get("field");
        const value = searchParams.get("value");

        if (!field || !value) {
            return NextResponse.json(
                { error: "Missing field or value" },
                { status: 400 }
            );
        }

        // 🔐 1. Verify Firebase session cookie
        const cookieStore = await cookies(); // NOT async
        const sessionCookie = cookieStore.get("__session")?.value;
        if (!sessionCookie) {
            return NextResponse.json(
                { error: "Not authenticated" },
                { status: 401 }
            );
        }

        let decoded;
        try {
            decoded = await knowmusiqAdminAuth.verifySessionCookie(sessionCookie, true);
        } catch (err) {
            return NextResponse.json(
                { error: "Invalid session" },
                { status: 401 }
            );
        }

        const loggedInEmail = decoded.email;

        // 🔐 2. If field === "user", enforce security
        if (field === "user" && value !== loggedInEmail) {
            return NextResponse.json(
                { error: "Access forbidden" },
                { status: 403 }
            );
        }

        // 🔍 3. Query Firestore
        const snapshot = await knowmusiqAdminDB
            .collection("videos")
            .where(field, "==", value)
            .get();

        const videos = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));

        return NextResponse.json({ videos });

    } catch (err: any) {
        console.error("API error:", err);
        return NextResponse.json(
            { error: "Server error", details: err.message },
            { status: 500 }
        );
    }
}
