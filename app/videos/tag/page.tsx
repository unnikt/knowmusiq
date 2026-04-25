"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import ClientWrap from "@/components/ClientWrap";
import VideoURL from "@/components/VideoURL";
import { useSearchParams } from "next/navigation";
import TagForm from "@/components/TagForm";
import AddButton from "@/components/AddButton";
import TopBar from "@/components/TopBar";

export default function TagVideoPage() {
    const v = useSearchParams().get("v");

    const [videoId, setVideoId] = useState<string | null>(v);
    const [loading, setLoading] = useState(false);

    return (
        <ClientWrap >
            <div className="section-mid mb-0">
                <TopBar>
                    <AddButton text="Person" href="/client/AddPerson" />
                </TopBar>
                <div className={`bg-(--surface) ${videoId ? "hidden" : ""} p-4 rounded-md`}>
                    <VideoURL onChange={(id) => setVideoId(id)} />
                </div>

                <TagForm vid={videoId} onLoad={setLoading} />

                {loading && <p className="text-(--primary)">Loading video…</p>}

            </div>
        </ClientWrap>
    );
}
