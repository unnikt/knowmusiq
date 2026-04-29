import ClientWrap from "@/components/ClientWrap";
import TopBar from "@/components/TopBar";
import YouTubePlayer from "@/components/YTPlayer";
import { knowmusiqAdminDB } from "@/lib/server/knowmusiqAdmin";
import ButtonTag from "@/components/TagVideoButton";
import ShareButton from "@/components/ShareButton";
import Link from "next/link";
import IconsTray from "@/components/IconsTray";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const videoId = slug;

    const doc = await knowmusiqAdminDB.collection('videos').doc(videoId).get();

    if (!doc.exists) {
        return {
            title: "Raga not found",
            description: "The requested raga could not be found.",
        };
    }
    const data = doc.data();
    const description = `Check out this song in ${data.raga}`;

    return {
        title: data.title,
        description: description,
        openGraph: {
            title: data.title,
            description: description,
            url: `https://musiq-me.com/videos/${videoId}`,
            type: "article",
            images: [
                {
                    url: `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`,
                    width: 1200,
                    height: 630,
                    alt: `${data.title} raga OG image`,
                },
                {
                    url: `https://musiq-me.com/og-default-new.png`,
                    width: 1200,
                    height: 630,
                    alt: `${data.title} raga OG image`,
                },
            ]
        },
        twitter: {
            card: "summary_large_image",
            title: data.title,
            description: description,
            images: ["https://musiq-me.com/og-default.png"]
        }
    };
}


export default async function VideoPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const snaps = await knowmusiqAdminDB.collection("videos").doc(slug).get();

    if (!snaps.exists)
        return (
            <ClientWrap>
                <TopBar />
                <div className="card">
                    <p>Video not found!</p>
                </div>
            </ClientWrap>
        )

    const video = { id: snaps.id, ...snaps.data() };

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
