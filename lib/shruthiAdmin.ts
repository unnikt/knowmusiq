import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const app = getApps().length
    ? getApps()[0]
    : initializeApp({
        credential: cert({
            projectId: process.env.NEXT_PUBLIC_SHRUTHI_PROJECT_ID,
            clientEmail: process.env.NEXT_PUBLIC_SHRUTHI_CLIENT_EMAIL,
            privateKey: process.env.NEXT_PUBLIC_SHRUTHI_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
    });

export const shruthiDB = getFirestore(app);

