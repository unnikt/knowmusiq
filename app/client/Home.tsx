"use client"
import ClientWrap from "../../components/ClientWrap";
import VideoSlider from "../../components/VideoSlider";
import VideoTile from "../../components/VideoTile";

interface HomeProps {
    videos: any;
}
export default function HomePage({ videos }: HomeProps) {
    return (
        <div className="text-(--text)">
            <h2 className="subtitle pt-0!">Browse by raga</h2>
            <VideoSlider>
                {videos.map((v) => (
                    v.raga && (
                        <VideoTile link="raga" target="_self" key={v.id} video={v} url={`/videos/${v.videoId}`} width="min-w-70" />
                    )
                ))}
            </VideoSlider>

            <h2 className="subtitle">Browse by composer</h2>
            <VideoSlider>
                {videos.map((v) => (
                    v.comp &&
                    <VideoTile link="comp" target="_self" key={v.id} video={v} url={`/persons/${v.comp}`} width="min-w-70" />
                ))}
            </VideoSlider>
        </div>
    )
}