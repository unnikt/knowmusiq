import { NextResponse } from "next/server";
import { knowmusiqAdminDB } from "@/lib/knowmusiqAdmin";
import { hasRights } from "@/lib/auth/hasRights";

export async function GET(req: Request) {
    try {
        if (false) { //Enable Authentication if necessary
            // 1. Authenticate user and check rights
            const Rights = await hasRights(req, ["tagEditor"]);
            // 2. If user doesn't have rights, return 403
            if (!Rights) {
                return NextResponse.json(
                    { error: "Unauthorized!" },
                    { status: 403 }
                );
            }
        }
        const { searchParams } = new URL(req.url);
        const fld = searchParams.get("key");
        const value = searchParams.get("value");
        const map: Record<string, string> =
            { Composer: "comp", Singer: "sing", Lyricist: "lyri" };

        if (!fld || !value) {
            return NextResponse.json({ values: ["Empty key||value"] });
        }

        // Map UI tag → Firestore type
        const snaps = await knowmusiqAdminDB
            .collection("persons")
            .where(fld, "==", fld == "type" ? map[value] : value)
            .get();

        const values = snaps.docs.map(doc => ({
            name: doc.data().name,
            type: doc.data().type,
            slug: doc.data().slug
        }));

        return NextResponse.json({ values });
    } catch (err: any) {
        console.error("ERR: api/persons:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
