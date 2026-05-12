"use client";
import { useState } from "react";
interface Props {
    title: string;
    children: React.ReactNode;
    state?: boolean
}

export function Accordion({ title, children, state = false }: Props) {
    const [open, setOpen] = useState(state);

    return (
        <div >
            <button
                onClick={() => setOpen(!open)}
                className="w-full bg-(--surface) p-2 border-b-2 border-my-secondary rounded-t flex items-center justify-between  text-left"
            >
                <span className="title">{title}</span>
                <svg
                    className={`h-5 w-5 transform transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"
                        }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            {open && <div
                className={` transition-all duration-300 ${open ? "opacity-100" : "max-h-0 opacity-0"}`}
            >
                <div className="pb-4 rounded-t-0">{children}</div>
            </div>}
        </div>
    );
}
