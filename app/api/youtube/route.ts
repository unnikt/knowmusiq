import { NextResponse } from "next/server";

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    const apiKey = process.env.YOUTUBE_API_KEY;

    const url = `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${id}&key=${apiKey}`;

    const res = await fetch(url);
    const json = await res.json();

    const item = json.items?.[0]?.snippet;

    return NextResponse.json({
        title: item?.title || "",
        thumbnail: item?.thumbnails?.high?.url || "",
    });
}