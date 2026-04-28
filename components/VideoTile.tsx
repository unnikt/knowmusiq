// src/components/YouTubeVideoTile.tsx
import { xRef } from "@/lib/MapValues";
import { toCamelCase } from "../lib/string/camelcase";
import Image from "next/image";
import Link from "next/link";
import { SquaresPlusIcon } from "@heroicons/react/20/solid";
import ShareButton from "./ShareButton";
import { Button } from "@headlessui/react";
import ButtonTag from "./TagVideoButton";

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
    const urls = links.map(l => video[l] ? ["comp", "sing", "lyri"].includes(l) ? `/persons/${video[l]}` : `/raga/${video[l]}` : null);

    return (
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
                    {urls.map((url, i) => (
                        url && (
                            <Link href={`${url}`} key={i}>
                                {(video[links[i]]) &&
                                    <p className="mt-1 text-sm text-(--primary)">{toCamelCase(video[links[i]].replace(/-/g, " "))}</p>
                                }
                            </Link>
                        )
                    ))}
                </div>
            </div>
            <div className="w-full flex justify-end align-middle mb-2 gap-2 border-t pt-2 border-slate-400">
                <ShareButton
                    url={`https://musiq-me.com/videos/${video.videoId}`}
                    title={video.title}
                    text={""}
                />
                <ButtonTag videoId={video.videoId} />
            </div>
        </div>
    );
}