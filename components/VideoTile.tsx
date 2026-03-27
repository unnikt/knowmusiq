// src/components/YouTubeVideoTile.tsx
import { toCamelCase } from "../lib/camelcase";
import Image from "next/image";
import Link from "next/link";

export default function VideoTile({ video, url, target }) {
    const thumbnail = `https://img.youtube.com/vi/${video.videoId}/hqdefault.jpg`;
    // const url = `https://www.youtube.com/watch?v=${video.videoId}`;

    return (
        <div className="rounded-xl border border-gray-200 bg-white shadow-sm hover:shadow-md transition">
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
                        className="object-cover group-hover:scale-105 transition-transform"
                    />
                    {video.duration && (
                        <span className="absolute bottom-2 right-2 rounded bg-black/80 px-2 py-0.5 text-xs text-white">
                            {video.duration}
                        </span>
                    )}
                </div>
            </Link>
            <div className="p-3 min-h-20">
                <h3 className="line-clamp-2 text-sm font-semibold text-gray-900">
                    {toCamelCase(video.title)}
                </h3>
                {(video.tags && video.tags.raga) &&
                    <Link
                        href={`/ragas/${video.tags.raga}`}>
                        {video.tags &&
                            <p className="mt-1 text-xs text-my-primary">{video.tags.raga}</p>
                        }
                    </Link>
                }
            </div>
        </div>
    );
}