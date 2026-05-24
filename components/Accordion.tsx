"use client";
import React, { useState } from "react";
interface Props {
    title: React.ReactNode;
    children: React.ReactNode;
    state?: boolean
}

export function Accordion({ title, children, state = false }: Props) {
    const [open, setOpen] = useState(state);

    return (
        <div className="flex flex-col justify-between" >
            <div className="flex justify-between items-center gap-2 text-(--text) font-medium">
                {title}
                <button
                    onClick={() => setOpen(!open)}
                    className=" p-2 "
                >
                    <svg
                        className={`h-7 w-7 transform transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"
                            }`}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

            {open && <div
                className={` transition-all duration-300 ${open ? "opacity-100" : "max-h-0 opacity-0"}`}
            >
                <div className="pb-4 rounded-t-0">{children}</div>
            </div>}
        </div>
    );
}
