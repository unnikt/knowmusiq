import { getKnowmusiqAdminDB } from "../server/knowmusiqAdmin";

export async function getStats() {
    const ragasSnap = await (await getKnowmusiqAdminDB()).collection("ragas").count().get();
    const videosSnap = await (await getKnowmusiqAdminDB()).collection("videos").count().get();
    const personsSnap = await (await getKnowmusiqAdminDB()).collection("persons").count().get(); // if exists

    return {
        ragas: ragasSnap.data().count,
        videos: videosSnap.data().count,
        persons: personsSnap.data().count,
    };
}
