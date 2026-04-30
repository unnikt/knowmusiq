// app/videos/[slug]/page.tsx
import { getVideoData } from '@/lib/getVideoData';

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = await getVideoData(slug);

    if (!data) {
        return {
            title: "Raga not found",
            description: "The requested raga could not be found.",
        };
    }

    const description = `Check out this song in ${data.raga}`;

    return {
        title: data.title,
        description,
        openGraph: {
            title: data.title,
            description,
            url: `https://musiq-me.com/videos/${slug}`,
            type: "article",
            images: [
                {
                    url: `https://img.youtube.com/vi/${slug}/sddefault.jpg`,
                    width: 640,
                    height: 480,
                    alt: `${data.title} raga OG image`,
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title: data.title,
            description,
            images: [`https://img.youtube.com/vi/${slug}/sddefault.jpg`]
        }
    };
}

import ClientWrap from "@/components/ClientWrap";
import TopBar from "@/components/TopBar";
import YouTubePlayer from "@/components/YTPlayer";
import { knowmusiqAdminDB } from "@/lib/server/knowmusiqAdmin";
import ButtonTag from "@/components/TagVideoButton";
import ShareButton from "@/components/ShareButton";
import Link from "next/link";
import IconsTray from "@/components/IconsTray";

export default async function VideoPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = await getVideoData(slug);

    if (!data)
        return (
            <ClientWrap>
                <TopBar />
                <div className="card">
                    <p>Video not found!</p>
                </div>
            </ClientWrap>
        )

    const video = { id: data.videoId, ...data };

    const tags = [
        { key: "comp", label: "Composer", base: "/persons/" },
        { key: "lyri", label: "Lyricist", base: "/persons/" },
        { key: "sing", label: "Singer", base: "/persons/" },
        { key: "movi", label: "Movie", base: "/movie/" },
        { key: "lang", label: "Language", base: "/language/" },
        { key: "raga", label: "Raga", base: "/raga/" },
        { key: "tala", label: "Tala", base: "/tala/" },
    ];


    return (
        <ClientWrap >
            <TopBar />
            <div className="card mb-4">
                <YouTubePlayer videoId={slug} autoplay={false} key={slug} />
                <p className="title truncate">{video["title"]}</p>
                <div className="flex gap-2 text-(--primary)">
                    {video && tags.map(tag =>
                        video[tag.key] &&
                        <Link
                            key={tag.key}
                            href={`${tag.base}/${video[tag.key]}`}>
                            {video[tag.key]}
                        </Link>
                    )}
                </div>
                <IconsTray justify="end">
                    <ShareButton text={video["title"]} url={`/videos/${video.id}`} title={video["title"]} />
                    <ButtonTag videoId={video.id} />
                </IconsTray>
            </div>
        </ClientWrap>
    );
}
