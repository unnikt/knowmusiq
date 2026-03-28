import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    projectId: process.env.NEXT_PUBLIC_SHRUTHI_PROJECT_ID!,
    apiKey: process.env.NEXT_PUBLIC_SHRUTHI_API_KEY!,
    authDomain: process.env.NEXT_PUBLIC_SHRUTHI_AUTH_DOMAIN!,
    appId: process.env.NEXT_PUBLIC_SHRUTHI_APP_ID!,
    storageBucket: process.env.NEXT_PUBLIC_SHRUTHI_STORAGE_BUCKET!,
    messagingSenderId: process.env.NEXT_PUBLIC_SHRUTHI_MESSAGING_SENDER_ID!,
};
console.log(firebaseConfig)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
export const dbShruthi = getFirestore(app);