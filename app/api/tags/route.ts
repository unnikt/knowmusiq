import { NextResponse } from "next/server";
import { knowmusiqAdminDB } from "@/lib/server/knowmusiqAdmin";
import { hasRights } from "@/lib/auth/hasRights";
import { Tags } from "@/lib/const/Tags";

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
        const tag = searchParams.get("key");
        const value = searchParams.get("value");
        const src = Tags.find(t => t.key === tag)?.src; // Default to "persons" if tag not found

        // console.log("API Request - Tag:", tag, "Value:", value, "Source:", src);

        if (!tag || !value || !src) {
            return NextResponse.json({ error: ["Invalid tag, value, or source"] });
        }

        // Map UI tag → Firestore type
        let queryRef: FirebaseFirestore.Query = knowmusiqAdminDB.collection(src);

        queryRef = queryRef.where("idx", "==", value.slice(0, 3).toUpperCase()); // Default filter to get all entries of the type

        const snaps = await queryRef.get();
        const values = snaps.docs.map(doc => {
            const d = doc.data();
            return {
                name: d.name,
                lang: d.lang,
                type: d.type,
                slug: d.slug,
                year: d.year
            };
        });

        return NextResponse.json({ values });
    } catch (err: any) {
        console.error("ERR: api/persons:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
