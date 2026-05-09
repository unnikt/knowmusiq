"use client";

import { ShareIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

export default function ShareButton({ title, text, url }) {
    const [open, setOpen] = useState(false);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title,
                    text,
                    url,
                });
            } catch (err) {
                console.error("Share cancelled", err);
            }
        } else {
            setOpen(true);
        }
    };

    const copyToClipboard = () => {
        navigator.clipboard.writeText(url);
    };

    return (
        <>
            <button
                onClick={handleShare}
                className="p-2 text-(--primary)"
            >
                <ShareIcon className="h-5 w-5 text-(--primary)" />
            </button>

            {open && (
                <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
                    <div className="bg-white dark:bg-neutral-900 p-6 rounded shadow-xl w-80">
                        <h2 className="text-lg font-semibold mb-3">Share this page</h2>

                        <button
                            onClick={copyToClipboard}
                            className="w-full mb-3 px-3 py-2 rounded bg-neutral-200 dark:bg-neutral-700"
                        >
                            Copy Link
                        </button>

                        <a
                            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                                url
                            )}`}
                            target="_blank"
                            className="block w-full mb-3 px-3 py-2 rounded bg-blue-600 text-white text-center"
                        >
                            Share on Facebook
                        </a>

                        <a
                            href={`https://wa.me/?text=${encodeURIComponent(url)}`}
                            target="_blank"
                            className="block w-full mb-3 px-3 py-2 rounded bg-green-600 text-white text-center"
                        >
                            Share on WhatsApp
                        </a>

                        <button
                            onClick={() => setOpen(false)}
                            className="w-full px-3 py-2 rounded bg-neutral-300 dark:bg-neutral-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}
