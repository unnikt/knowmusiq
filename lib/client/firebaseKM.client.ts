// lib/firebaseClient.ts
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY!,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN!,
    projectId: process.env.FIREBASE_PROJECT_ID!,
    appId: process.env.FIREBASE_APP_ID!,
};

// Initialize app once
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export Firestore
export const dbKnowMusic = getFirestore(app);

// Export Auth + Google Provider
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
