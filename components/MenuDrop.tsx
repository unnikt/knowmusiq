"use client";

import { useState, useRef, useEffect } from "react";

interface Props {
    label: string;
    items?: string[];
    onSelect?: (item: string) => void;
    className?: string
}
export default function DropDownMenu({ label, items, onSelect, className }: Props) {
    const [open, setOpen] = useState(false);
    const ref = useRef(null);
    // Close dropdown when clicking outside
    useEffect(() => {
        function handleClickOutside(e) {
            if (ref.current && !ref.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative inline-block" ref={ref}>
            <button
                onClick={() => setOpen(!open)}
                className={`py-2 px-4 bg-(--surface) text-(--primary)  border-b-2 border-b-my-secondary hover:bg-sky-700 transition ${className}`}
            >
                {label}
            </button>

            {open && (
                <div className="absolute menu mt-2 w-48  shadow-lg  rounded-md z-20">
                    {items.map((item) => (
                        <button
                            key={item}
                            onClick={() => {
                                setOpen(false);
                                onSelect?.(item);
                            }}
                            className="w-full text-left px-4 py-1 hover:bg-gray-100"
                        >
                            {item}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
