import { knowmusiqAdminDB } from "@/lib/server/knowmusiqAdmin";
import VideoTile from "./VideoTile";
import { Video } from "@/lib/Definitions";
import { TagLinks } from "@/lib/const/Tags";

interface Props {
    videoId?: string,
    tag?: string,
    value?: string,
    videos?: Video[];
}

export default async function VideoGrid({ videoId, tag, value, videos }: Props) {

    let data: Video[] = [];

    if (videoId) {
        const doc = await knowmusiqAdminDB.collection("videos").doc(videoId).get();

        if (!doc.exists)
            return <div className="p-10 text-center text-gray-500">Video not found!</div>;

        data = [{ ...(doc.data() as Video) }];   // wrap single item in array
    }
    else if (videos) {
        data = videos as Video[];                // already an array
    }
    else if (tag && value) {
        const snaps = await knowmusiqAdminDB.collection("videos")
            .where(tag, "==", value)
            .get();

        if (snaps.empty) {
            return <div className="p-10 text-center text-gray-500">No videos found</div>;
        }

        data = snaps.docs.map(doc => doc.data() as Video);
    }

    const vData: Video[] = data;

    // const lnk = Tags.map(t =>)

    if (!vData || vData.length === 0) {
        return (
            <p className="bg-(--surface) rounded p-4">No videos found.</p>
        );
    }
    const lnk = TagLinks("movi");

    return (

        <div className={"videoGrid mt-4"} >
            {vData.map((video: Video) => (
                <VideoTile
                    key={video.videoId}
                    video={video}
                    url={`/videos/${video.videoId}`}
                    target="_self"
                    link={lnk}
                    width=""
                />
            ))
            }
        </div>
    )


}