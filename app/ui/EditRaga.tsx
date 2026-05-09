"use client";

import TopBar from "@/components/TopBar";
import { Raga } from "@/lib/Definitions";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface Props {
    raga: Raga;
}

export default function EditRaga({ raga }: Props) {
    const router = useRouter();
    const auth = getAuth();

    const [userId, setUserId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    const [form, setForm] = useState({
        arohana: raga.arohana,
        avarohana: raga.avarohana,
        description: raga.description,
        parent: raga.parent,
    });

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
    }

    function handleSave() {
        const payload = { ...raga, ...form };
        console.log(payload);
    }

    return (
        <div>
            <TopBar />

            <div className="max-w-xl mx-auto mt-6 p-6 bg-(--surface) rounded-xl shadow-sm border border-(--border)">
                <h2 className="title mb-4">{raga.name}</h2>

                <div className="flex flex-col gap-4 edit">

                    {/* Arohana */}
                    <div className="flex flex-col gap-1">
                        <label className="text-sm font-medium text-(--primary)">Arohana</label>
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
                        <label className="text-sm font-medium text-(--primary)">Avarohana</label>
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
                        <label className="text-sm font-medium text-(--primary)">Description</label>
                        <textarea
                            value={form.description}
                            onChange={(e) => updateField("description", e.target.value)}
                            placeholder="Describe the raga's mood, usage, and characteristics..."
                            className="input-field min-h-[120px] resize-none"
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
        </div>
    );
}
