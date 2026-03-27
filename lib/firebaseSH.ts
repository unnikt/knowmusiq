import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: process.env.SHRUTHI_API_KEY!,
    authDomain: process.env.SHRUTHI_AUTH_DOMAIN!,
    projectId: process.env.SHRUTHI_PROJECT_ID!,
    storageBucket: process.env.SHRUTHI_STORAGE_BUCKET!,
    messagingSenderId: process.env.SHRUTHI_MESSAGING_SENDER_ID!,
    appId: process.env.SHRUTHI_APP_ID!,
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const db = getFirestore(app);