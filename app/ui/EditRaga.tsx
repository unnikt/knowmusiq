"use client";

import ClientWrap from "@/components/ClientWrap";
import getHeader from "@/lib/client/getHearder";
import { Raga } from "@/lib/Definitions";
import { ArrowPathIcon, SparklesIcon } from "@heroicons/react/20/solid";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
    raga: Raga;
    onEdited?: (msg: string) => void;
}

export default function EditRaga({ raga, onEdited }: Props) {
    const router = useRouter();
    const auth = getAuth();
    const src = "ragas";

    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);
    const [isEdited, setEdited] = useState(false);

    const [form, setForm] = useState({
        arohana: raga.arohana,
        avarohana: raga.avarohana,
        description: raga.description || "",
        parent: raga.parent,
    });
    console.log(form);
    // AUTH CHECK
    useEffect(() => {
        const unsub = onAuthStateChanged(auth, (user) => {
            if (!user) {
                router.push(`/auth/signin?ret=/raga/${raga.slug}/edit`);
            } else {
                setUserId(user.uid);
            }
            setLoading(false);
        });

        return () => unsub();
    }, []);

    function updateField(key: keyof typeof form, value: string) {
        setForm(prev => ({ ...prev, [key]: value }));
        setEdited(true);
    }

    function handleReset() {
        setForm({
            arohana: raga.arohana,
            avarohana: raga.avarohana,
            description: raga.description,
            parent: raga.parent,
        });
        setEdited(false);
    }

    async function handleSave() {
        if (!isEdited) return;

        const payload = { ...raga, ...form };
        const log = {
            date: new Date().toISOString(),
            user: auth.currentUser.email,
            beforeEdit: JSON.stringify(raga)
        }
        console.log(payload, log);
        // Update raga
        await fetch("/api/update", {
            method: "POST",
            headers: { "Content-Type": "application/json", ...await getHeader() },
            body: JSON.stringify({
                db: src,
                doc_id: raga.slug,
                data: payload,
            }),
        }).then((res) => {
            if (res.ok) {
                if (onEdited) onEdited(`Document ${src}/${raga.slug} updated successfully`);
                router.push(`/raga/${raga.slug}`)
            }
            else {
                throw new Error("Failed to save video");
            }
        }).catch((err) => {
            console.error(err);
            alert("Error saving video: " + err.message);
        });


    }
    async function handleSummarise() {
        setLoading(true);
        const prompt = `Summarise the following Carnatic raga description in 3–4 sentences.Keep it musical, clear, and emotionally expressive. ${raga.name}`;

        const res = await fetch("/api/summarise", {
            method: "POST",
            body: JSON.stringify({ prompt: prompt }),
        });

        const data = await res.json();
        updateField("description", data.summary);
        setLoading(false);
    }

    return (
        <ClientWrap>
            <div className="w-full sm:max-w-xl mx-auto p-6 bg-(--surface) rounded-xl shadow-sm border border-(--border)">
                <div className="flex justify-between items-end my-2">
                    <h2 className="title">{raga.name}</h2>
                    <ArrowPathIcon className="w-7 h-7 text-(--primary)/70"
                        onClick={handleReset} />
                </div>

                <div className="flex flex-col gap-2 edit">
                    {/* Arohana */}
                    <div className="flex flex-col gap-1">
                        <label className="font-medium">Arohana</label>
                        <input
                            type="text"
                            value={form.arohana}
                            onChange={(e) => updateField("arohana", e.target.value)}
                            placeholder="e.g., S R2 G3 M1 P D2 N3 S"
                            className="input-field"
                        />
                    </div>

                    {/* Avarohana */}
                    <div className="flex flex-col gap-1">
                        <label className="font-medium">Avarohana</label>
                        <input
                            type="text"
                            value={form.avarohana}
                            onChange={(e) => updateField("avarohana", e.target.value)}
                            placeholder="e.g., S N3 D2 P M1 G3 R2 S"
                            className="input-field"
                        />
                    </div>

                    {/* Description */}
                    <div className="flex flex-col gap-1">
                        <div className="flex justify-between">
                            <label className="font-medium">Description</label>
                            {loading && <p className="text-sm text-my-secondary/60">Generating...</p>}
                            <button onClick={handleSummarise}
                                className="text-(--primary)" >
                                <SparklesIcon className="w-5 h-5" />
                            </button>
                        </div>

                        <textarea
                            value={form.description}
                            onChange={(e) => updateField("description", e.target.value)}
                            placeholder="Describe the raga's mood, usage, and characteristics..."
                            className="input-field resize-y! h-50 p-2 border border-slate-400"
                        />
                    </div>
                    <button
                        onClick={handleSave}
                        className="mt-4 px-5 py-2 rounded-md bg-my-secondary text-white font-medium hover:bg-my-secondary/90 transition"
                    >
                        Save Changes
                    </button>
                </div>
            </div>
        </ClientWrap>
    );
}
