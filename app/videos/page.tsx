// app/videos/page.tsx
import VideoTile from "@/components/VideoTile";
import ClientWrap from "@/components/ClientWrap";
import { knowmusiqAdminDB } from "@/lib/server/knowmusiqAdmin";
import TopBar from "@/components/TopBar";

export default async function Page() {
    const snapshot = await knowmusiqAdminDB.collection("videos").limit(20).get();

    const videos = snapshot.docs.map((doc) => ({ id: doc.id, videoId: doc.data().videoId, ...doc.data() }));

    return (
        <ClientWrap >
            <TopBar />
            <div className="videoGrid">
                {videos.map((video) => (
                    <VideoTile key={video.id} video={video} width=""
                        url={`/videos/${video.videoId}`}
                        target={"_self"}
                        link="raga" />
                ))}
            </div>
        </ClientWrap>
    );
}