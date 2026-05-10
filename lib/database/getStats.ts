import { knowmusiqAdminDB } from "../server/knowmusiqAdmin";

export async function getStats() {
    const ragasSnap = await knowmusiqAdminDB.collection("ragas").count().get();
    const videosSnap = await knowmusiqAdminDB.collection("videos").count().get();
    const personsSnap = await knowmusiqAdminDB.collection("persons").count().get(); // if exists

    return {
        ragas: ragasSnap.data().count,
        videos: videosSnap.data().count,
        persons: personsSnap.data().count,
    };
}
