import { requireRole } from "@/lib/auth/requireRole";
import { verifyUser } from "@/lib/auth/verifyUser";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const vid = searchParams.get("vid");

    if (!vid) {
        return NextResponse.json(
            { error: "Missing YouTube video ID (vid)" },
            { status: 400 }
        );
    }

    try {
        // 1. Authenticate
        const user = await verifyUser(req);
        // 2. Authorize
        requireRole(user, ["admin", "tagEditor"]);

    } catch (err: any) {
        const message =
            err?.message ||
            (typeof err === "string" ? err : "Authentication failed");

        const status =
            message === "MISSING_TOKEN" || message === "INVALID_TOKEN"
                ? 401 : message === "FORBIDDEN"
                    ? 403 : 400;

        console.log("api/youtube Auth error:", message);

        return NextResponse.json({ error: message }, { status });
    }

    // 3. Call YouTube API
    const apiKey = process.env.YOUTUBE_API_KEY;
    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${vid}&key=${apiKey}`;

    const res = await fetch(url);
    const json = await res.json();

    const item = json.items?.[0]?.snippet;

    return NextResponse.json({
        title: item?.title || "",
        thumbnail: item?.thumbnails?.high?.url || "",
        description: item?.description || "",
    });
}