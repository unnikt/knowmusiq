import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");

    if (!query) {
        return NextResponse.json({ error: "missing_query" }, { status: 400 });
    }

    const apiKey = process.env.YOUTUBE_API_KEY;

    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(
        query
    )}&maxResults=10&key=${apiKey}`;

    const res = await fetch(url, { cache: "no-store" });

    // Detect quota exceeded
    if (res.status === 403) {
        return NextResponse.json({ error: "quota" }, { status: 200 });
    }

    // Detect other API errors
    if (!res.ok) {
        return NextResponse.json(
            { error: "youtube_api_error", status: res.status },
            { status: 500 }
        );
    }

    const json = await res.json();

    return NextResponse.json({
        items: json.items || [],
    });
}