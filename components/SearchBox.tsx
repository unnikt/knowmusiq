"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Modal from "./Modal";

interface Props {
    onClose?: () => void;
}

export default function SearchBox({ onClose }: Props) {
    const [open, setOpen] = useState(true);
    const [query, setQuery] = useState("");
    const router = useRouter();

    useEffect(() => {
        setOpen(true);
    }, []); // <-- FIXED

    function handleSearch() {
        setOpen(false); // optional: close after search
        const trimmed = query.trim();
        if (!trimmed) return;
        router.push(`/raga/${encodeURIComponent(trimmed)}`);
    }

    return (
        <Modal
            isOpen={open}
            key="search"
            w="200px"
            onClose={() => { setOpen(false); if (onClose) onClose() }}
        >
            <div className="bg-(--surface2)  p-8 flex flex-col justify-center gap-2 sm:flex-col sm:gap-0 sm:max-w-md">
                <p className=" mb-2 text-xl">Find a raga</p>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                    placeholder="Search ragas..."
                    className=" px-4 py-2 bg-slate-400 rounded-md focus:outline-none focus:ring-1 focus:ring-my-primary/80"
                />
                <button
                    className="btn btn-accent mt-2"
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
        </Modal>
    );
}
