"use client";

export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { dbKnowMusic } from "@/lib/firebaseKM";
import YouTubePlayer from "@/components/YouTubePlayer";
import BackButton from "@/components/BackButton";

export default function TagVideoPage() {
    const searchParams = useSearchParams();
    const videoId = searchParams.get("url"); // e.g. 6RYm6hM9UpE

    const [video, setVideo] = useState<any>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!videoId) return;

        const loadVideo = async () => {
            try {
                const q = query(
                    collection(dbKnowMusic, "YouTubeVideos"),
                    where("videoId", "==", videoId),
                    limit(1)
                );

                const snaps = await getDocs(q);
                (!snaps.empty) ? setVideo(snaps.docs[0].data()) : setVideo(null);
            } catch (err) { console.error("Error loading video:", err); }
            finally { setLoading(false); }
        };

        loadVideo();
    }, [videoId]);

    if (!videoId) {
        return <p className="p-6 text-red-600">Missing videoId in URL.</p>;
    }

    if (loading) {
        return <p className="p-6">Loading video…</p>;
    }

    if (!video) {
        return (
            <p className="p-6 text-red-600">
                No video found for ID: {videoId}
            </p>
        );
    }

    return (
        <div className="max-w-3xl mx-auto p-10">
            <BackButton />
            {/* Video preview */}
            <div className="mb-6">
                <YouTubePlayer videoId={video.videoId} />
            </div>

            {/* Video info */}
            <h2 className="text-xl font-semibold">{video.title}</h2>
            <p className="text-gray-600 mb-6">{video.description}</p>

            {/* Existing tags */}
            {video.tags && (
                <div className="mb-6">
                    <h3 className="font-semibold mb-2">Existing Tags</h3>
                    <div className="flex flex-wrap gap-2">
                        {Object.entries(video.tags as Record<string, string>).map(([key, value]) => (
                            <span
                                key={key}
                                className="px-3 py-1 bg-gray-200 rounded-full text-sm"
                            >
                                {key}: {value}
                            </span>
                        ))}
                    </div>
                </div>
            )}
            <h2 className="H2">Tag Video</h2>

            {/* TODO: Insert your Tagging Form here */}
            <p className="text-gray-500">
                Tagging UI goes here — autocomplete ragas, categories, etc.
            </p>

            {/* <p>Title: {video.title}</p>
            <p>Description: {video.description}</p> */}

        </div>
    );
}