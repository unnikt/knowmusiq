import { NextResponse } from "next/server";
import { knowmusiqAdmin } from "@/lib/knowmusiqAdmin";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const parent = searchParams.get("parent");

    const snap = await knowmusiqAdmin
        .collection("ragas")
        .where("parent", "==", parent)
        .orderBy("rid")
        .get();

    const items = snap.docs.map((doc) => ({
        label: `${doc.data().rid} - ${doc.data().name}`,
        href: `/ragas/${doc.data().slug}`,
    }));

    return NextResponse.json({ items });
}
