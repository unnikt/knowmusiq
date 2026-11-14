import { NextResponse } from "next/server";
import { getKnowmusiqAdminDB } from "@/lib/server/knowmusiqAdmin";

export async function GET() {
    try {
        const snap = (await getKnowmusiqAdminDB())
            .collection("admin")
            .doc("config-edits")
            .get();

        if (!(await snap).exists) {
            return NextResponse.json({ error: "Collections config not found" }, { status: 404 });
        }

        return NextResponse.json({ data: (await snap).data() || [] });
    } catch (err: any) {
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
