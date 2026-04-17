// src/components/YouTubeVideoTile.tsx
import { xRef } from "@/lib/MapValues";
import { toCamelCase } from "../lib/string/camelcase";
import Image from "next/image";
import Link from "next/link";
import { SquaresPlusIcon } from "@heroicons/react/20/solid";

interface videoTileProps {
    video: any;
    url: string;
    target: string;
    link: string;
    width: string;
}
export default function VideoTile({ video, url, target = "_self", link = "raga", width = "" }: videoTileProps) {
    const thumbnail = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
    // const url = `https://www.youtube.com/watch?v=${video.videoId}`;

    const base = ["comp", "sing", "lyri"].includes(link) ? "/persons/" : "/ragas/";

    return (
        // <div className={`p-2 my-2 rounded-sm  border border-gray-200 bg-white shadow-sm hover:shadow-md transition ${width}`}>
        <div className={`pt-4 px-4 my-2 bg-(--surface) text-(--text) border border-(--border) rounded-md ${width}`}>
            <Link
                href={url}
                target={target}
                className="group block overflow-hidden "
            >
                <div className="relative aspect-video">
                    <Image
                        src={thumbnail}
                        alt={video.title ?? ""}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="rounded object-cover group-hover:scale-105 transition-transform"
                    />
                    {video.duration && (
                        <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-0.5 text-xs ">
                            {video.duration}
                        </span>
                    )}
                </div>
            </Link>
            <div className="flex flex-col justify-around pb-3 min-h-20">
                <h3 className="line-clamp-2 text-sm font-semibold  min-h-4">
                    {toCamelCase(video.title)}
                </h3>
                <div className="flex justify-between items-center pt-2">
                    <Link href={`${base}${video[link]}`} >
                        {(video[link]) &&
                            <p className="mt-1 text-sm text-(--primary)">{toCamelCase(video[link].replace(/-/g, " "))}</p>
                        }
                    </Link>
                    <Link href={`/videos/tag?v=${video.videoId}`}>
                        <SquaresPlusIcon className="w-5 h-5 text-(--primary)" />
                    </Link>
                </div>
            </div>
        </div>
    );
}