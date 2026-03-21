import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";

const app1 = getApps().length
    ? getApps()[0]
    : initializeApp({
        credential: cert({
            projectId: process.env.SHRUTHI_PROJECT_ID,
            clientEmail: process.env.SHRUTHI_CLIENT_EMAIL,
            privateKey: process.env.SHRUTHI_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        }),
    });

export const shruthiDB = getFirestore(app1);

// const app2 = getApps().length
//     ? getApps()[0]
//     : initializeApp({
//         credential: cert({
//             projectId: process.env.KNOWMUSIC_PROJECT_ID,
//             clientEmail: process.env.KNOWMUSIC_CLIENT_EMAIL,
//             privateKey: process.env.KNOWMUSIC_PRIVATE_KEY?.replace(/\\n/g, "\n"),
//         }),
//     });

// export const knowmusiqDB = getFirestore(app2);