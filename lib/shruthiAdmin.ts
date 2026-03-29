import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const shruthiApp =
    getApps().find(a => a.name === "shruthi") ||
    initializeApp(
        {
            credential: cert({
                projectId: process.env.SHRUTHI_PROJECT_ID,
                clientEmail: process.env.SHRUTHI_CLIENT_EMAIL,
                privateKey: process.env.SHRUTHI_PRIVATE_KEY?.replace(/\\n/g, "\n"),
            }),
        },
        "shruthi"
    );

export const shruthiAdmin = getFirestore(shruthiApp);
