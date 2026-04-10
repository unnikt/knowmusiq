"use client"

import { auth } from "@/lib/client/firebaseKM.client";
import GetWikiName from "./GetWikiName"
import { useRouter } from "next/navigation";

interface PersonsClientProps {
    src: string;
    doc_id: string;
    onSuccess?: (msg: string) => void;
}
export default function PersonsClient({ src, doc_id, onSuccess }: PersonsClientProps) {
    const router = useRouter();

    const handleName = async (name: string) => {
        // Get ID token for authenticated requests
        const token = await auth.currentUser?.getIdToken(true);
        const header = token ? { Authorization: `Bearer ${token}` } : {};

        // Add to list, send to API, etc.
        await fetch("/api/update", {
            method: "POST",
            headers: { "Content-Type": "application/json", ...header },
            body: JSON.stringify({
                db: src,
                doc_id: doc_id,
                data: {
                    wiki: name,
                },
            }),
        }).then((res) => {
            if (!res.ok) {
                throw new Error("Failed to save video");
            }
            else {
                if (onSuccess) onSuccess(`Document ${src}: ${doc_id} updated successfully`);
                router.push(`/persons/${doc_id}`)
            }
        }).catch((err) => {
            console.error(err);
            alert("Error saving video: " + err.message);
        });

    };

    return (
        <div>
            <GetWikiName onName={handleName} />
        </div>

    )

}