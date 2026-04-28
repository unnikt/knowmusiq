"use client";

import { useEffect, useState } from "react";
import { dbShruthi } from "@/lib/client/firebaseSH.client";
import { doc, setDoc } from "firebase/firestore";
import TagVideo from "@/components/TagVideo";
import { useApp } from "@/context/AppContext";
import ClientWrap from "@/components/ClientWrap";
import TopBar from "@/components/TopBar";

export default function AddVideoPage() {
    const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

    const handleSave = async (data: any) => {
        try {
            setStatus("saving");

            // Use YouTube ID as the Firestore document ID
            await setDoc(doc(dbShruthi, "videos", data.youtubeId), {
                ...data,
                createdAt: Date.now(),
            });

            setStatus("saved");
        } catch (err) {
            console.error("Error saving video:", err);
            setStatus("idle");
        }
    };

    const { setMinimiseHeader } = useApp();

    useEffect(() => {
        // minimise header when page loads
        setMinimiseHeader(true);

        // optional: restore when leaving page
        return () => setMinimiseHeader(false);
    }, [setMinimiseHeader]);


    return (

        <ClientWrap>
            <TopBar />
            <TagVideo onSubmit={handleSave} />
            {status === "saving" && (
                <p className="mt-4 text-blue-600 font-medium">Saving…</p>
            )}
            {status === "saved" && (
                <p className="mt-4 text-green-600 font-medium">
                    Video saved successfully!
                </p>
            )}
        </ClientWrap>
    );
}