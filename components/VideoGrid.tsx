import VideoTile from "./VideoTile";
import { Video } from "@/lib/Definitions";

interface Props {
    videos?: Video[];
}

export default function VideoGrid({ videos }: Props) {
    if (!videos || videos.length === 0) {
        return (
            <p className="bg-(--surface) rounded p-4">No videos found.</p>
        );
    }
    return (

        <div className={"videoGrid mt-4"} >
            {videos.map((video: Video) => (
                <VideoTile
                    key={video.videoId}
                    video={video}
                    url={`/videos/${video.videoId}`}
                    target="_self"
                    link="comp|lyri|movi"
                    width=""
                />
            ))
            }
        </div>
    )


}