// app/videos/[slug]/page.tsx
import { getVideoData } from '@/lib/database/getVideoData';

// export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
//     const { slug } = await params;
//     const data = await getVideoData(slug);

//     if (!data) {
//         return {
//             title: "Raga not found",
//             description: "The requested raga could not be found.",
//         };
//     }

//     const description = `Check out this song in ${data.raga}`;

//     return {
//         title: data.title,
//         description,
//         openGraph: {
//             title: data.title,
//             description,
//             url: `https://musiq-me.com/videos/${slug}`,
//             type: "article",
//             images: [
//                 {
//                     url: data.img,
//                     width: 640,
//                     height: 480,
//                     alt: `${data.title} raga OG image`,
//                 },
//                 {
//                     url: 'https://musiq-me.com/default-og-new.png',
//                     width: 1200,
//                     height: 630,
//                 }
//             ]
//         },
//         twitter: {
//             card: "summary_large_image",
//             title: data.title,
//             description,
//             images: [`https://img.youtube.com/vi/${slug}/sddefault.jpg`]
//         }
//     };
// }

import ClientWrap from "@/components/ClientWrap";
import TopBar from "@/components/TopBar";
import YouTubePlayer from "@/components/YTPlayer";
import ButtonTag from "@/components/ButtonTagVideo";
import ShareButton from "@/components/ButtonShare";
import Link from "next/link";
import IconsTray from "@/components/IconsTray";
import { deSlug } from '@/lib/string/deSlugify';
import { Tags } from '@/lib/const/Tags';

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

    return (
        <ClientWrap >
            <TopBar />
            <div className="card m-auto max-w-2xl p-0! border-(--surface) border">
                <YouTubePlayer videoId={slug} autoplay={false} key={slug} />
                <p className="title truncate p-2">{video["title"]}</p>
                <div className="flex gap-2 text-(--primary) p-2">
                    {video && Tags.map(tag =>
                        video[tag.key] &&
                        <Link
                            key={tag.key}
                            href={`${tag.base}/${video[tag.key]}`}>
                            {deSlug(video[tag.key])}
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
