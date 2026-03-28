import { addDoc, collection } from "firebase/firestore";
import { dbKnowMusic } from "@/lib/firebaseKM";

export async function writeToFirestore(rows) {
    const colRef = collection(dbKnowMusic, "ragas");

    var cnt = 0;
    for (const row of rows) {
        await addDoc(colRef, row);
        cnt++;
    }
    return cnt;
}