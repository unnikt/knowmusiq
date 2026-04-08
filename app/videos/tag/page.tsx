"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { dbKnowMusic } from "@/lib/client/firebaseKM.client";
import YouTubePlayer from "@/components/YTPlayer";
import BackButton from "@/components/BackButton";
import ClientWrap from "@/components/ClientWrap";
import VideoURL from "@/components/VideoURL";
import { PlusIcon } from "@heroicons/react/20/solid";
import Modal from "@/components/Modal";
import TaggingModal from "@/components/TaggingModel";
import { useSearchParams } from "next/navigation";
import ItemList from "@/components/ItemList";
import { Input } from "postcss";
import TagForm from "@/components/TagForm";

export default function TagVideoPage() {
    const v = useSearchParams().get("v");

    const [videoId, setVideoId] = useState<string | null>(v);
    const [loading, setLoading] = useState(false);

    return (
        <ClientWrap minimiseHeader={true}>
            <div className="section-mid mb-0">
                <BackButton />
                <div className={videoId ? "hidden" : ""}>
                    <VideoURL onChange={(id) => setVideoId(id)} />
                </div>

                <TagForm vid={videoId} onLoad={setLoading} />

                {loading && <p className="text-gray-500">Loading video…</p>}

            </div>
        </ClientWrap>
    );
}
