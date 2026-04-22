"use client";
import { useEffect, useState } from "react";
import YouTubePlayer from "./YTPlayer";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { auth, dbKnowMusic } from "@/lib/client/firebaseKM.client";
import { SaveVideo } from "@/lib/video/SaveVideo";
import { TrashIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useUser } from "@/context/UserContext";

interface TagFormProps {
    vid: string;
    onLoad?: (flag: boolean) => void;
}
export default function TagForm({ vid, onLoad }: TagFormProps) {
    const { user, verifying } = useUser();
    const [video, setVideo] = useState<any>(null);
    const [selectedTag, setSelectedTag] = useState<string | null>("")
    const [suggestions, setSuggestions] = useState<{ name: string; slug: string }[]>([]);
    const [message, setMessage] = useState("");
    const PERSON_TAGS = ["Composer", "Singer", "Lyricist"];
    const [persons, setPersons] = useState<{ name: string; type: string; slug: string }[]>([]);

    const [tags, setTags] = useState([
        { key: "Composer", value: "" },
        { key: "Singer", value: "" },
        { key: "Lyricist", value: "" },
        { key: "Movie", value: "" },
        { key: "Language", value: "" },
        { key: "Raga", value: "" },
        { key: "Tala", value: "" }
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
                })

            } catch (err) {
                console.error("Error loading video:", err);
            } finally {
                if (onLoad) onLoad(false);
            }
        };

        loadVideo();
    }, [vid]);

    async function handleTagChange(tagKey: string) {
        setSelectedTag(tagKey);
        setSuggestions([]);

        if (user && PERSON_TAGS.includes(tagKey)) {
            setMessage("Loading ...");

            const tagType = tagKey.slice(0, 4).toLowerCase();

            // Check cache first
            const values = persons?.filter((e: { type: string; }) => e.type == tagType);
            if (values?.length > 0) {
                setSuggestions(values || []);
                setMessage("");
                return;
            }
            // If not in cache, fetch from API and update cache
            try {
                const res = await fetch(`/api/persons?key=type&value=${tagKey}`);
                const data = await res.json();
                setPersons(prev => [...prev, ...data.values]);
                const values = data.values.filter((e: { type: string; }) => e.type == tagType);
                setSuggestions(values || []);
            }
            catch (err) {
                console.error("Error fetching suggestions:", err);
                setMessage("Error fetching suggestions");
            }
            finally {
                setMessage("");
            }
        }
    }

    async function filterSuggestions(query: string) {

        if (query.length < 2) {
            // Get from cache if available
            const tagType = selectedTag?.slice(0, 4).toLowerCase();
            const values = persons?.filter((e: { type: string; }) => e.type == tagType);
            if (values?.length > 0)
                setSuggestions(values || []);
            else
                setSuggestions([]);
            return;
        };

        const q = query.toLowerCase().replace(/\s+/g, "");
        const values = suggestions.filter(p =>
            p.name.toLowerCase().replace(/\s+/g, "").includes(q)
        );
        if (values?.length > 0) setSuggestions(values);
    }

    function handleSave() {
        const filter = tags.filter(e => e.value != "");
        const data = filter.reduce((acc, e) => {
            acc[e.key.slice(0, 4).toLowerCase()] = e.value;
            return acc;
        }, {});

        SaveVideo(video.videoId, data)
            .then(res => { setMessage("Saved..."); console.log(res) })
            .catch(err => { setMessage("Error saving tags"); console.log(err) })
    }

    return (
        <div className="mx-4 p-2 bg-(--surface) rounded-md sm:mx-0 sm:p-6 ">
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
                    {suggestions.length > 0 && (
                        <div className="absolute mt-1 menu min-h-10 min-w-50 rounded shadow right-5">
                            <input className=" m-2 rounded p-0"
                                onKeyDown={(e) => { filterSuggestions(e.currentTarget.value) }} />

                            {suggestions.map((s, i) => (
                                <div
                                    key={i}
                                    className="px-3 py-1 hover:text-my-hilite cursor-pointer overflow-y-auto max-h-10"
                                    onClick={() => {
                                        setTags(prev =>
                                            prev.map(t =>
                                                t.key === selectedTag
                                                    ? { ...t, value: s.name }
                                                    : t
                                            )
                                        );
                                        setSuggestions([])
                                    }}
                                >
                                    {s.name}
                                </div>
                            ))}
                        </div>
                    )}
                    <div className="flex flex-col gap-1">
                        {tags.map(t =>
                            <span key={t.key}
                                className={`p-1 cursor-pointer  ${selectedTag === t.key ? "" : ""}`}
                                onClick={() => { handleTagChange(t.key) }}
                            > {t.value ? `${t.key}: ${t.value}` : t.key}
                            </span>
                        )}
                    </div>

                    {user &&
                        <div>
                            <div className="flex items-center mt-2">
                                <button className="btn btn-primary"
                                    onClick={handleSave} >
                                    Save tags
                                </button>
                                <a className="btn btn-outline"
                                    href="/tags/new"
                                >
                                    Add new
                                </a>
                                <button
                                    className=" p-2 rounded"
                                    disabled={!selectedTag}
                                    onClick={() => {
                                        setTags(prev =>
                                            prev.map(tag =>
                                                tag.key === selectedTag ? { ...tag, value: "" } : tag
                                            )
                                        );
                                        setSelectedTag("");
                                        setSuggestions([]);
                                    }}
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>

                                <button className="btn pl-4 border-0! ">
                                    {message ? message : ""}
                                </button>
                            </div>
                            {!verifying && <p className="p-2 italic">Updates will be linked to {user.email || "Guest"}</p>}
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