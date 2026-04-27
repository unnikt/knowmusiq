"use client"
import ClientWrap from "@/components/ClientWrap";
import ItemList from "@/components/ItemList";
import { useUser } from "@/context/UserContext";
import { useEffect, useState } from "react";

export default function UserUpload() {
    const { user, verifying } = useUser();
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        if (!user?.email) return;

        fetch(`/api/videos/get?field=user&value=${user.email}`)
            .then(async res => {
                if (!res.ok) {
                    const text = await res.text();
                    console.error("API ERROR:", text);
                    throw new Error("API returned non-JSON");
                }
                return res.json();
            })
            .then(data => {
                setVideos(
                    data.videos.map(v => ({
                        label: v.title,
                        href: `/videos/tag?v=${v.videoId}`
                    }))
                );
            })
            .catch(err => console.error("FETCH ERROR:", err));
    }, [user]);

    if (!user) return (
        <ClientWrap>
            <div className="p-2">Loading...</div>
        </ClientWrap>
    )

    return (
        <ClientWrap>
            <ItemList items={videos} pageSize={10} showIndex={true} />
        </ClientWrap>
    )

}