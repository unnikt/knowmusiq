"use client"
import { Shuffle } from "@/lib/array/Shuffle";
import VideoSlider from "../../components/VideoSlider";
import VideoTile from "../../components/VideoTile";
import HeroVideoCarousel from "@/components/HeroCarousel";
import { useEffect, useState } from "react";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

interface HomeProps {
    videos: any;
}
export default function HomePage({ videos }: HomeProps) {
    const shuffle1 = Shuffle(videos)
    const shuffle2 = Shuffle(shuffle1)
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    function handleSelect(v) {
        router.push(`/videos/${v.videoId}`)
    }
    if (!mounted) {
        return (
            <div className="relative w-full max-w-4xl mx-auto h-64 sm:h-80 md:h-96 rounded-xl bg-black/10 animate-pulse" />
        );
    }

    return (
        <div className="text-(--text)">
            <HeroVideoCarousel videos={videos} onSelect={(v) => handleSelect(v)} />

            <p className="text-lg mt-1">Ragas</p>
            <VideoSlider>
                {shuffle1.map((v) => (
                    v.raga && (
                        <VideoTile link="raga" target="_self" key={v.id} video={v} url={`/videos/${v.videoId}`} width="min-w-70" />
                    )
                ))}
            </VideoSlider>

            <p className="text-lg mt-1">Composers</p>
            <VideoSlider>
                {shuffle2.map((v) => (
                    v.comp &&
                    <VideoTile link="comp" target="_self" key={v.id} video={v} url={`/persons/${v.comp}`} width="min-w-70" />
                ))}
            </VideoSlider>
        </div >
    )
}