// lib/saveVideo.ts
import { auth } from "@/lib/client/firebaseKM.client";
import getHeader from "../client/getHearder";

export async function SaveVideo(videoId: string, data: any) {
    try {
        // const user = auth.currentUser;
        // const token = user ? await user.getIdToken(true) : null;
        // const headers = {
        //     "Content-Type": "application/json",
        //     ...(token ? { Authorization: `Bearer ${token}` } : {}),
        // };
        // console.log("Headers:", headers);

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
