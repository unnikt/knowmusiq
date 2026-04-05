// lib/firebaseClient.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.NEXT_PUBLIC_KNOWMUSIC_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_KNOWMUSIC_AUTH_DOMAIN!,
    projectId: process.env.NEXT_PUBLIC_KNOWMUSIC_PROJECT_ID!,
    appId: process.env.NEXT_PUBLIC_KNOWMUSIC_APP_ID!,
};

// Initialize app once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export Firestore
export const dbKnowMusic = getFirestore(app);

// Export Auth + Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
