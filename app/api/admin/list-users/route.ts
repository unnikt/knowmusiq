import { NextResponse } from "next/server";
import { knowmusiqAdminAuth } from "@/lib/knowmusiqAdmin";

export async function GET() {
    try {
        const list = await knowmusiqAdminAuth.listUsers();

        const users = list.users.map(u => ({
            uid: u.uid,
            email: u.email,
            claims: u.customClaims || {}
        }));

        return NextResponse.json({ users });
    } catch (err: any) {
        console.error("list-users error:", err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
