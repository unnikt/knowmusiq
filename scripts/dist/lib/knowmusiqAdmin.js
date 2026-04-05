import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
const knowmusiqAdminApp = getApps().find(a => a.name === "knowmusiq") ||
    initializeApp({
        credential: cert({
            projectId: process.env.KNOWMUSIC_PROJECT_ID,
            clientEmail: process.env.KNOWMUSIC_CLIENT_EMAIL,
            privateKey: process.env.KNOWMUSIC_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
    }, "knowmusiq");
export const knowmusiqAdminAuth = getAuth(knowmusiqAdminApp);
export const knowmusiqAdminDB = getFirestore(knowmusiqAdminApp);
