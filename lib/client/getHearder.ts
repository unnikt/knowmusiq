import { auth } from "./firebaseKM.client";

export default async function getHeader() {
    // Get ID token for authenticated requests
    const token = await auth.currentUser?.getIdToken(true);
    const header = token ? { Authorization: `Bearer ${token}` } : {};
    return header;
}