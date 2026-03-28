import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

console.log(process.env.KNOWMUSIC_PROJECT_ID);

const app = getApps().length
    ? getApps()[0]
    : initializeApp({
        credential: cert({
            projectId: process.env.KNOWMUSIC_PROJECT_ID,
            clientEmail: process.env.KNOWMUSIC_CLIENT_EMAIL,
            privateKey: process.env.KNOWMUSIC_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
    });
export const knowmusiqAdmin = getFirestore(app);