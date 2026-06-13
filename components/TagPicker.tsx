"use client";
import { useState } from "react";
import Modal from "./Modal";

interface Props {
    open?: boolean;
    hideicon?: boolean;
    hidelabel?: boolean;
    label?: string;
    tag: string;
    pValue: string;
    className?: string;
    onSelect?: (str: string) => void;
}
export default function TagPicker({ open: initialOpen, hideicon = true, hidelabel = true, label, tag, pValue, className, onSelect }: Props) {
    const [open, setOpen] = useState(initialOpen);
    const [suggestions, setSuggestions] = useState<any[]>([]);
    const [message, setMessage] = useState("");
    const [tags, setTags] = useState<any[]>([]);

    async function handleInput(value: string) {
        if (value.trim().length < 3) {
            setSuggestions([]);
            return;
        }

        // Check if we already have tags for this field
        const values = tags.filter(t => t.name.toLowerCase().includes(value.toLowerCase()));
        if (values.length > 0) {
            setSuggestions(values);
            return;
        }

        // If not, fetch from API
        try {
            setMessage("Loading ...");
            const res = await fetch(`/api/tags?key=${tag}&value=${value}`);
            const data = await res.json();
            const values = data.values.map((v: any) => { return { name: v.name, slug: v.slug, key: tag } })

            // save fetched tags to cache
            setTags(prev => [...prev, ...values]);

            // Filter suggestions based on input value
            setSuggestions(values || []);
            setMessage("");

        }
        catch (err) {
            console.error("Error fetching suggestions:", err);
            setMessage("Error fetching suggestions");
            return;
        }

    }

    return (
        <div>
            <button
                className={`flex items-center gap-2 ${className}`}
                onClick={() => setOpen(true)}>
                {!hidelabel &&
                    <span className="">
                        {label}
                    </span>}
                <span className="material-symbols-outlined">search</span>
            </button>
            <Modal title={label} onClose={() => { setOpen(false); setSuggestions([]); }} isOpen={open} w="400px" h="400px">
                <div
                    className="flex flex-col justify-center min-w-0 h-full gap-1 p-4  bg-(--surface2)">
                    <input type="text" placeholder="Search..."
                        onKeyUp={(e) => handleInput(e.currentTarget.value)}
                        defaultValue={pValue}
                    />
                    {message && <p>{message}</p>}

                    {suggestions.length > 0 && (
                        <div className="flex flex-col gap-2 max-h-60 overflow-y-auto">
                            {suggestions.map((s, i) => (
                                <div
                                    key={i}
                                    className="px-3 py-1 text-(--primary) hover:text-my-hilite cursor-pointer"
                                    onClick={() => {
                                        onSelect?.(s.name);
                                        setOpen(false);
                                    }}
                                >
                                    {s.name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

            </Modal>
        </div>
    )

}