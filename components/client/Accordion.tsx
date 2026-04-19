"use client";
import { useState } from "react";

export function Accordion({ title, children }: { title: string; children: React.ReactNode }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="">
            <button
                onClick={() => setOpen(!open)}
                className="w-full flex items-center justify-between py-4 text-left"
            >
                <span className="text-lg font-medium ">{title}</span>

                <svg
                    className={`h-5 w-5  transform transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"
                        }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>

            <div
                className={` transition-all duration-300 ${open ? "opacity-100" : "max-h-0 opacity-0"
                    }`}
            >
                <div className="pb-4">{children}</div>
            </div>
        </div>
    );
}
