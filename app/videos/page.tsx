// app/videos/page.tsx
import VideoTile from "@/components/VideoTile";
import { shruthiDB } from "@/lib/shruthiAdmin";
import ClientWrap from "@/components/ClientWrap";
import BackButton from "@/components/BackButton";

export default async function Page() {
    const snapshot = await shruthiDB.collection("videos").limit(20).get();

    const videos = snapshot.docs.map((doc) => ({ id: doc.id, videoId: doc.data().videoId, ...doc.data() }));

    return (
        <ClientWrap minimiseHeader>
            <div className="section-mid">
                <BackButton />
                <div className="videoGrid">
                    {videos.map((video) => (
                        <VideoTile key={video.id} video={video}
                            url={`https://www.youtube.com/watch?v=${video.videoId}`}
                            target={"_self"} />
                    ))}
                </div>
            </div>
        </ClientWrap>
    );
}