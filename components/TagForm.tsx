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

interface TagFormProps {
    vid: string;
    onLoad?: (flag: boolean) => void;
}
export default function TagForm({ vid, onLoad }: TagFormProps) {
    const { user, verifying } = useUser();
    const [video, setVideo] = useState<any>(null);
    const [selectedTag, setSelectedTag] = useState<string | null>(null);
    const [message, setMessage] = useState("");

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
                                    <button className="btn bg-my-primary  border-0! "
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
                                        disabled={!selectedTag}
                                        onClick={() => {
                                            setTags(prev =>
                                                prev.map(tag =>
                                                    tag.key === selectedTag ? { ...tag, value: "" } : tag
                                                )
                                            );
                                            setSelectedTag("");
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
            </div>
        </div >
    )

}