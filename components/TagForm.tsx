"use client";
import { useEffect, useState } from "react";
import YouTubePlayer from "./YTPlayer";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { dbKnowMusic } from "@/lib/client/firebaseKM.client";
import { SaveVideo } from "@/lib/video/SaveVideo";
import Link from "next/link";
import { useUser } from "@/context/UserContext";
import TagPicker from "./TagPicker";
import { TagLabel } from "@/lib/const/Tags";
import { deSlug } from "@/lib/string/deSlugify";
import Modal from "./Modal";

interface TagFormProps {
    vid: string;
    onLoad?: (flag: boolean) => void;
}
export default function TagForm({ vid, onLoad }: TagFormProps) {
    const { user, verifying } = useUser();
    const [video, setVideo] = useState<any>(null);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [message, setMessage] = useState("");
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

    const [tags, setTags] = useState([
        { key: "comp", value: "" },
        { key: "sing", value: "" },
        { key: "lyri", value: "" },
        { key: "movi", value: "" },
        { key: "lang", value: "" },
        { key: "raga", value: "" },
        { key: "tala", value: "" },
        { key: "krit", value: "" }
    ]);

    useEffect(() => {
        if (!vid) return;
        if (onLoad) onLoad(true);

        const loadVideo = async () => {
            try {
                const q = query(
                    collection(dbKnowMusic, "videos"),
                    where("videoId", "==", vid),
                    limit(1)
                );

                const snaps = await getDocs(q);
                setVideo(!snaps.empty ? snaps.docs[0].data() : null);
                setTags(prev => {
                    const v = !snaps.empty ? snaps.docs[0].data() : null;
                    if (!v) return prev;
                    return prev.map(t => ({ key: t.key, value: v[t.key.slice(0, 4).toLowerCase()] || "" }))
                });

            } catch (err) {
                console.error("Error loading video:", err);
            } finally {
                if (onLoad) onLoad(false);
            }
        };

        loadVideo();
    }, [vid]);


    function handleSave() {
        const filter = tags.filter(e => e.value != "");
        const data = filter.reduce((acc, e) => {
            acc[e.key.slice(0, 4).toLowerCase()] = e.value;
            return acc;
        }, {});

        SaveVideo(video.videoId, data)
            .then(res => { setMessage("Saved..."); console.log(res.body) })
            .catch(err => { setMessage("Error saving tags"); console.log(err) })
    }

    return (
        <div className="p-4 bg-(--surface) rounded-md sm:mx-0 sm:p-6 ">
            <div className="flex flex-col sm:flex-row gap-1 w-full">
                <div className="w-full max-w-200 aspect-video">
                    <YouTubePlayer key={vid} videoId={vid} />
                    {video && (
                        <div key={video}>
                            <h2 className="text-md font-semibold ">{video.title}</h2>
                            {video.description && <p className="mb-6">{video.description}</p>}
                        </div>
                    )}
                </div>

                <div className="w-full lg:ml-2 ">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                        {tags.map(t => (
                            <div
                                key={t.key}
                                className={`flex items-center p-2 rounded cursor-pointer 
                                    sm:flex-col sm:items-start 
                                    ${selectedTag === t.key ? "bg-(--surface2)" : "bg-(--surface2)"}`}
                                onClick={() => setSelectedTag(t.key)}
                            >
                                <span className="font-medium text-sm text-(--text)/50 w-20 inline-block">
                                    {`${TagLabel(t.key) || t.key}: `}
                                </span>
                                <span>
                                    {t.key ? `${t.key == "raga" ? deSlug(t.value) : t.value}` : t.key}
                                </span>
                                {selectedTag == t.key &&
                                    <TagPicker
                                        open={true}
                                        tag={selectedTag}
                                        label={`Find ${TagLabel(t.key) || t.key}`}
                                        pValue={t.key === "raga" ? deSlug(t.value) : t.value}
                                        onSelect={(value) => {
                                            setTags(prev =>
                                                prev.map(tag =>
                                                    tag.key === t.key ? { ...tag, value } : tag
                                                )
                                            );
                                            // TODO - fix second click issue where it wont open after selecting once. maybe use a ref to track if its the first open or not?
                                        }} />
                                }
                            </div>
                        ))}
                    </div>

                    {user &&
                        <div>
                            <div className="flex items-center mt-2">
                                <div className="flex items-center gap-2">
                                    <button className="btn btn-primary"
                                        onClick={handleSave} >
                                        Save tags
                                    </button>
                                    <Link
                                        href={"/client/AddPerson"}
                                        className="material-symbols-outlined">
                                        person_add
                                    </Link>
                                    <Link
                                        href={"/movie"}
                                        className="material-symbols-outlined">
                                        movie
                                    </Link>
                                    <button
                                        className="material-symbols-outlined"
                                        disabled={!vid}
                                        onClick={() => {
                                            if (!vid) return;
                                            setPendingDeleteId(vid);
                                            setShowDeleteModal(true);
                                        }}
                                    >
                                        delete
                                    </button>

                                </div>

                                <button className="btn pl-4 border-0! ">
                                    {message ? message : ""}
                                </button>
                            </div>
                            {!verifying && <p className="pt-4 italic text-(--text)/70 text-sm">Updates will be linked to {user.email || "Guest"}</p>}
                        </div>
                    }
                    {!user &&
                        <Link href="/user" className="p-2 mx-auto text-center rounded text-(--primary) block w-max" >
                            Login to edit tags
                        </Link>
                    }
                </div>

                <Modal
                    title="Confirm Delete"
                    isOpen={showDeleteModal}
                    onClose={() => setShowDeleteModal(false)}
                    w="400px"
                    h="auto"
                >
                    <div className="p-4 space-y-4">
                        <p className="text-lg">
                            Are you sure you want to delete this video?
                        </p>

                        <p className="font-mono bg-gray-200 p-2 rounded">
                            {pendingDeleteId && video.title ? `${video.title} [vid:${pendingDeleteId}]` : ""}
                        </p>

                        <div className="flex justify-end space-x-3 mt-4">
                            <button
                                className="px-4 py-2 rounded bg-gray-300"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                Cancel
                            </button>

                            <button
                                className="px-4 py-2 rounded bg-red-600 text-white"
                                onClick={async () => {
                                    if (!pendingDeleteId) return;

                                    // Call delete API
                                    const res = await fetch("/api/admin/delete-video", {
                                        method: "POST",
                                        headers: { "Content-Type": "application/json" },
                                        body: JSON.stringify({
                                            payload: {
                                                docId: pendingDeleteId,
                                                // Optionally, you can include user info for audit logging
                                                user: user ? { email: user.email, uid: user.uid } : null
                                            }
                                        }),
                                    });

                                    const json = await res.json();

                                    if (json.error) {
                                        alert(`Error: ${json.error}`);
                                    } else {
                                        alert(json.message);

                                        // Clear tag locally
                                        setTags(prev =>
                                            prev.map(tag =>
                                                tag.key === pendingDeleteId
                                                    ? { ...tag, value: "" }
                                                    : tag
                                            )
                                        );

                                        setSelectedTag("");
                                    }

                                    setShowDeleteModal(false);
                                    setPendingDeleteId(null);
                                }}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </Modal>


            </div>

        </div >
    )

}