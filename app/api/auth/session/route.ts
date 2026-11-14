import { NextResponse } from "next/server";
import { getKnowmusiqAdminAuth } from "@/lib/server/knowmusiqAdmin";

export async function POST(req: Request) {
    const { idToken } = await req.json();

    const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
    const sessionCookie = await (await getKnowmusiqAdminAuth()).createSessionCookie(idToken, { expiresIn });
    const res = NextResponse.json({ status: "success" });
    res.cookies.set("__session", sessionCookie, {
        httpOnly: true,
        secure: true,
        path: "/",
        maxAge: expiresIn / 1000,
    });

    return res;
}
