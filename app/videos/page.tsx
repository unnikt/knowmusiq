// app/videos/page.tsx
import VideoTile from "@/components/VideoTile";
import ClientWrap from "@/components/ClientWrap";
import BackButton from "@/components/BackButton";
import { knowmusiqAdminDB } from "@/lib/knowmusiqAdmin";
import Link from "next/link";

export default async function Page() {
    const snapshot = await knowmusiqAdminDB.collection("videos").limit(20).get();

    const videos = snapshot.docs.map((doc) => ({ id: doc.id, videoId: doc.data().videoId, ...doc.data() }));

    return (
        <ClientWrap minimiseHeader>
            <div className="section-mid">

                <div className="flex justify-between align-middle items-center">
                    <BackButton />
                    <Link
                        className="btn-secondary"
                        href="/videos/tag">
                        Add videos
                    </Link>
                </div>

                <div className="videoGrid">
                    {videos.map((video) => (
                        <VideoTile key={video.id} video={video}
                            url={`/videos/tag/?v=${video.videoId}`}
                            target={"_self"} />
                    ))}
                </div>
            </div>
        </ClientWrap>
    );
}