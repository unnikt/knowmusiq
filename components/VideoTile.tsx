// src/components/YouTubeVideoTile.tsx
import { toCamelCase } from "../lib/string/camelcase";
import Image from "next/image";
import Link from "next/link";
import ShareButton from "./ButtonShare";
import { deSlug } from "@/lib/string/deSlugify";
import { Tags } from "@/lib/const/Tags";
import TagsTray from "./TagsTray";

interface videoTileProps {
    video: any;
    url: string;
    target: string;
    link: string;
    width: string;
}
export default function VideoTile({ video, url, target = "_self", link = "raga", width = "" }: videoTileProps) {
    const thumbnail = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;

    const links = link.split("|").map(l => l.trim());
    const urls = links.map(l =>
        video[l] ? ["comp", "sing", "lyri"].includes(l) ? `/persons/${video[l]}` : l == "movi" ? `/movie/${video[l]}` : `/raga/${video[l]}` : null);

    return (
        <div className={`relative card ${width} p-0! `}>
            <Link
                href={url}
                target={target}
                className="group block overflow-hidden"
            >
                <div className="relative aspect-video">
                    <Image
                        src={thumbnail}
                        alt={video.title ?? ""}
                        fill
                        sizes="(max-width: 768px) 50vw sm:100vw, 400px"
                        className="object-cover rounded-t-lg"
                    />
                </div>
                <div className="min-w-0 p-1">
                    <p className="font-semibold line-clamp-1">
                        {toCamelCase(video.title)}
                    </p>
                </div>
            </Link>
            <div className="pb-8">
                <TagsTray video={video} />
            </div>

            <div className="absolute bottom-0 w-full flex justify-end align-middle gap-2 border-t border-slate-400  text-(--primary)">
                <ShareButton
                    url={`https://musiq-me.com/videos/${video.videoId}`}
                    title={video.title}
                    text={""}
                />
            </div>
        </div>
    );
}