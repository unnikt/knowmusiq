import { collection, addDoc } from "firebase/firestore";
import { dbKnowMusic } from "./firebaseKM.client";

export type YoutubeVideo = {
    videoId: string;
    title: string;
    thumbnail: string;
};

export async function saveYoutubeVideo(video: YoutubeVideo) {
    if (!video || !video.videoId) return;

    try {
        await addDoc(collection(dbKnowMusic, "YouTubeVideos"), {
            videoId: video.videoId,
            title: video.title,
            thumbnail: video.thumbnail,
            createdAt: Date.now(),
        });
    }
    catch (err) {
        console.error("SAVE ERROR:", err);
    }
}