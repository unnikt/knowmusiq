import { NextResponse } from "next/server";
import { knowmusiqAdminDB } from "@/lib/server/knowmusiqAdmin";

export async function GET() {
    try {
        const snap = await knowmusiqAdminDB
            .collection("admin")
            .doc("config-edits")
            .get();

        if (!snap.exists) {
            return NextResponse.json({ error: "Collections config not found" }, { status: 404 });
        }

        return NextResponse.json({ data: snap.data() || [] });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
