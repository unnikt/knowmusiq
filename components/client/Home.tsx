"use client"
import ClientWrap from "../ClientWrap";
import VideoSlider from "../VideoSlider"
import VideoTile from "../VideoTile";

interface HomeProps {
    videos: any;
}
export default function HomePage({ videos }: HomeProps) {
    function handleSelect(video) {
        console.log(video)

    }

    return (
        < ClientWrap >
            <div className="text-(--text)">
                <h2 className="mt-2 text-md tracking-wider font-semibold inline-block">
                    Browse by raga
                </h2>
                <VideoSlider>
                    {videos.map((v) => (
                        <VideoTile link="raga" target="_self" key={v.id} video={v} url={`/ragas/${v.raga}`} width="min-w-80" />
                    ))}
                </VideoSlider>
                <h2 className="mt-2 text-md tracking-wider font-semibold inline-block">
                    Browse by composer
                </h2>
                <VideoSlider>
                    {videos.map((v) => (
                        v.comp &&
                        <VideoTile link="comp" target="_self" key={v.id} video={v} url={`/persons/${v.comp}`} width="min-w-70" />
                    ))}
                </VideoSlider>
                <h2 className="mt-2 text-md tracking-wider font-semibold inline-block">
                    Topics
                </h2>

            </div>
        </ClientWrap >
    )
}