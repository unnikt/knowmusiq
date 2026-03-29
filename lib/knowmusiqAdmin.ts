import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const knowmusiqApp =
    getApps().find(a => a.name === "knowmusiq") ||
    initializeApp(
        {
            credential: cert({
                projectId: process.env.KNOWMUSIC_PROJECT_ID,
                clientEmail: process.env.KNOWMUSIC_CLIENT_EMAIL,
                privateKey: process.env.KNOWMUSIC_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            }),
        },
        "knowmusiq"
    );

export const knowmusiqAdmin = getFirestore(knowmusiqApp);
