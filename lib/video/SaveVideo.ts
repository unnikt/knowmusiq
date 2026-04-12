// lib/saveVideo.ts
import { auth } from "@/lib/client/firebaseKM.client";
import { knowmusiqAdminAuth } from "../server/knowmusiqAdmin";

export async function SaveVideo(videoId: string, data: any) {
    const user = auth.currentUser;
    const token = user ? await user.getIdToken(true) : null;

    const headers = {
        "Content-Type": "application/json",
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };

    const res = await fetch("/api/videos/tag", {
        method: "POST",
        headers,
        body: JSON.stringify({ videoId, data }),
    });

    if (!res.ok) {
        const message = await res.text();
        throw new Error(message || "Failed to save video");
    }

    return res;
}
