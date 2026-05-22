"use client";
import AddVideo from "@/components/AddVideo";
import ClientWrap from "@/components/ClientWrap";
import VideoGrid from "@/components/VideoGrid";
import { Krithi, Video } from "@/lib/Definitions";
import { toCamelCase } from "@/lib/string/camelcase";
import { deSlug } from "@/lib/string/deSlugify";
import { slugify } from "@/lib/string/slugify";
import Link from "next/link";
import { useState } from "react";

interface Props {
    krithi: Krithi;
    videos?: Video[];
}

export default function KritiPage({ krithi, videos }: Props) {
    const displayName = krithi.name;
    const displayRaga = toCamelCase(deSlug(krithi.raga));
    const [refreshKey, setRefreshKey] = useState(0);

    // Expose a refresh function for AddVideo
    const refresh = (msg: string) => { setRefreshKey((k) => k + 1) };

    return (
        <ClientWrap >
            <div className="flex flex-col gap-1 bg-(--surface) p-6 rounded-lg  ">
                <p className="text-xl border-b border-b-gray-500">{displayName}</p>
                <p>Composer: {toCamelCase(krithi.comp)}</p>
                <Link href={`/raga/${slugify(krithi.raga)}`}
                    className="text-(--primary) cursor-pointer">
                    <p>Raga: {displayRaga}</p>
                </Link>
                <p>Tala: {toCamelCase(krithi.tala)}</p>
                <p>{toCamelCase(krithi.lang)}</p>
                <p>{krithi.type}</p>

                <div className="pt-2 border-t border-t-gray-500 mt-2">
                    <AddVideo key={displayName} type="krit" name={displayName} slug={krithi.slug}
                        src={`/krithi/${krithi.slug}`} raga={displayRaga}
                        onSaved={refresh} />
                </div>

            </div>

            <VideoGrid key={refreshKey} videos={videos} />

        </ClientWrap>
    );
}