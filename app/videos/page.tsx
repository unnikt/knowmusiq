// app/videos/page.tsx
import VideoTile from "@/components/VideoTile";
import ClientWrap from "@/components/ClientWrap";
import BackButton from "@/components/BackButton";
import { knowmusiqAdminDB } from "@/lib/server/knowmusiqAdmin";

export default async function Page() {
    const snapshot = await knowmusiqAdminDB.collection("videos").limit(20).get();

    const videos = snapshot.docs.map((doc) => ({ id: doc.id, videoId: doc.data().videoId, ...doc.data() }));

    return (
        <ClientWrap >
            <div className="section-mid">
                <BackButton />

                <div className="videoGrid">
                    {videos.map((video) => (
                        <VideoTile key={video.id} video={video} width=""
                            url={`/videos/tag/?v=${video.videoId}`}
                            target={"_self"}
                            link="raga" />
                    ))}
                </div>
            </div>
        </ClientWrap>
    );
}