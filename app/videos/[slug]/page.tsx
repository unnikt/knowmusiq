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
import YouTubePlayer from "@/components/YTPlayer";
import ButtonTag from "@/components/ButtonTagVideo";
import ShareButton from "@/components/ButtonShare";
import Link from "next/link";
import IconsTray from "@/components/IconsTray";
import TagsTray from '@/components/TagsTray';
import VideoTile from '@/components/VideoTile';

export default async function VideoPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const data = await getVideoData(slug);

    if (!data)
        return (
            <ClientWrap>
                <div className="card">
                    <p>Video not found!</p>
                </div>
            </ClientWrap>
        )

    const video = { id: data.videoId, ...data };

    return (
        <ClientWrap >
            <VideoTile video={video} url={`/videos/${slug}`} target="_self" link="raga" width="m-auto max-w-2xl" />
        </ClientWrap>
    );
}
