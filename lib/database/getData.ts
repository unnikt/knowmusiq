import { collection, getDocs, query, where } from "firebase/firestore";
import { Query } from "../Definitions";
import { knowmusiqAdminDB } from "../server/knowmusiqAdmin";

export default async function getData(q: Query) {

    // Fetch a single document by ID
    if (q.type == "Document")
        try {
            if (!q.docId)
                return ({ error: "Missing docId for Document query" });

            const document = await knowmusiqAdminDB.collection(q.src).doc(q.docId).get();
            if (!document.exists) {
                return ({ status: "error", error: "Document not found" });
            }
            return { status: "success", data: document.data() };

        } catch (err: any) {
            throw new Error(err.message);
        }
    // Fetch a collection with optional filtering
    else if (q.type == "Collection")
        try {
            const snaps = await knowmusiqAdminDB.collection(q.src)
                .where(q.filter?.field || "none", q.filter?.op || "==", q.filter?.value || "none")
                .get();
            const data = snaps.docs.map((doc) => doc.data());
            return { status: "success", data };
        } catch (err: any) {
            throw new Error(err.message);
        }
}   