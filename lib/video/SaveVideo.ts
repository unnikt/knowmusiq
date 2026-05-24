// lib/saveVideo.ts
import { auth } from "@/lib/client/firebaseKM.client";
import getHeader from "../client/getHearder";
import { slugify } from "../string/slugify";

export async function SaveVideo(videoId: string, data: any) {
    try {
        if (data.raga) data.raga = slugify(data.raga);
        console.log("Saving video with data:", data);

        const res = await fetch("/api/videos/tag", {
            method: "POST",
            headers: await getHeader(),
            body: JSON.stringify({ videoId, data }),
        });
        if (!res.ok) {
            const message = await res.text();
            throw new Error(message || "Failed to save video");
        }
        return res;

    } catch (err) {
        console.error("Error saving video:", err);
        throw err;
    }
}
