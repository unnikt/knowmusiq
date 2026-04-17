"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import BackButton from "@/components/BackButton";
import ClientWrap from "@/components/ClientWrap";
import VideoURL from "@/components/VideoURL";
import { useSearchParams } from "next/navigation";
import TagForm from "@/components/TagForm";

export default function TagVideoPage() {
    const v = useSearchParams().get("v");

    const [videoId, setVideoId] = useState<string | null>(v);
    const [loading, setLoading] = useState(false);

    return (
        <ClientWrap >
            <div className="section-mid mb-0">
                <BackButton />
                <div className={`bg-(--surface) ${videoId ? "hidden" : ""} p-4 rounded-md`}>
                    <VideoURL onChange={(id) => setVideoId(id)} />
                </div>

                <TagForm vid={videoId} onLoad={setLoading} />

                {loading && <p className="text-(--primary)">Loading video…</p>}

            </div>
        </ClientWrap>
    );
}
