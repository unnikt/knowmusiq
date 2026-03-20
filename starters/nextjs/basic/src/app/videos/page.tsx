// app/videos/page.tsx
import VideoTile from "@/components/VideoTile";
import { adminDb } from "@/lib/firebase-admin";

export default async function Page() {
    const snapshot = await adminDb.collection("videos").get();
    const videos = snapshot.docs.map((doc) => doc.data());

    return (
        <div className="p-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {videos.map((video) => (
                    <VideoTile key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
}