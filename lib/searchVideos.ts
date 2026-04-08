// \knowmusiq\lib\searchVideos.ts
import { collection, query, where, orderBy, getDocs, } from "firebase/firestore";
import { dbKnowMusic } from "./client/firebaseKM.client";

export async function searchLocalVideos(title: string) {
    if (!title || title.trim() === "") return [];

    // Firestore prefix search
    const q = query(
        collection(dbKnowMusic, "YouTubeVideos"),
        orderBy("title"),
        where("title", ">=", title),
        where("title", "<=", title + "\uf8ff")
    );

    const snap = await getDocs(q);

    return snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
    }));
}