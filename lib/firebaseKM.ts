import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_KNOWMUSIC_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_KNOWMUSIC_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_KNOWMUSIC_PROJECT_ID!,
    storageBucket: process.env.NEXT_PUBLIC_KNOWMUSIC_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_KNOWMUSIC_MESSAGING_SENDER_ID!,
    appId: process.env.NEXT_PUBLIC_KNOWMUSIC_APP_ID!,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export const dbKnowMusic = getFirestore(app);