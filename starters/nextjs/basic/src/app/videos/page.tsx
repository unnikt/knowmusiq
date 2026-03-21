// app/videos/page.tsx
import VideoTile from "@/components/VideoTile";
import { shruthiDB } from "@/lib/firebase-admin";

export default async function Page() {
    const snapshot = await shruthiDB.collection("videos")
        .limit(20).get();
    const videos = snapshot.docs.map((doc) => ({ id: doc.id, data: doc.data() }));

    console.log("Videos.tsx:", videos.length)

    return (
        <div className="p-6">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {videos.map((video) => (
                    <VideoTile key={video.id} video={video.data} />
                ))}
            </div>
        </div>
    );
}