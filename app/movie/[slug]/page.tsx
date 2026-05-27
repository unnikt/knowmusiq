import ClientWrap from "@/components/ClientWrap";
import VideoTile from "@/components/VideoTile";
import { knowmusiqAdminDB } from "@/lib/server/knowmusiqAdmin";
import { deSlug } from "@/lib/string/deSlugify";
import { slugify } from "@/lib/string/slugify";
import Link from "next/link";

export default async function MoviePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const movie = slug.replace(/%20/g, " ");

    console.log(movie)
    // Fetch person by slug
    const snap = await knowmusiqAdminDB.collection("videos")
        .where("movi", "==", movie)
        .limit(20).get();

    if (snap.empty) {
        return <div className="p-10 text-center text-gray-500">No videos found</div>;
    }
    const videos = snap.docs.map((doc) => ({ id: doc.id, videoId: doc.data().videoId, ...doc.data() }));

    return (
        <ClientWrap >
            <div className="flex justify-between">
                <h2 className="text-xl py-2">{movie}</h2>
                <Link
                    href={"/movie"}
                    className="btn-material-icon material-symbols-outlined">
                    movie
                </Link>
            </div>

            <div className="videoGrid">
                {videos.map((video) => (
                    <VideoTile key={video.id} video={video} width=""
                        url={`/videos/${video.videoId}`}
                        target={"_self"}
                        link={`raga`} />
                ))}
            </div>
        </ClientWrap>
    );
}