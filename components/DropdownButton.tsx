"use client";

import { useState, useRef, useEffect } from "react";

export default function DropdownButton({ label = "Options", items = [], onSelect, className = "" }) {
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
                className={`py-2 bg-sky-600 text-white rounded-md shadow hover:bg-sky-700 transition ${className}`}
            >
                {label}
            </button>

            {open && (
                <div className="absolute mt-2 w-48 bg-white shadow-lg border rounded-md z-20">
                    {items.map((item) => (
                        <button
                            key={item}
                            onClick={() => {
                                setOpen(false);
                                onSelect?.(item);
                            }}
                            className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                            {item}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}
