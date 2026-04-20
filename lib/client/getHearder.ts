import { auth } from "./firebaseKM.client";

export default async function getHeader() {
    try {
        // Get ID token for authenticated requests
        const token = await auth.currentUser?.getIdToken(true);
        const header = token ? { Authorization: `Bearer ${token}` } : {};
        return header;
    } catch (err) {
        console.error("Error getting auth token:", err);
        return {};
    }
}