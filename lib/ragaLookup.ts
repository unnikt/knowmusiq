import { knowmusiqAdminDB } from "@/lib/knowmusiqAdmin";

export async function getRaga(slug: string) {
    const slugy = slug.replace(/%20/g, " ");

    // 1. Try exact slug match
    const snapBySlug = await knowmusiqAdminDB
        .collection("ragas")
        .where("slug", "==", slugy)
        .limit(1)
        .get();

    if (!snapBySlug.empty) {
        return {
            type: "exact",
            raga: snapBySlug.docs[0].data(),
        };
    }

    // 2. Fallback: melakarta idx search
    const idxKey = slugy.toUpperCase().slice(0, 3);

    const snapByIdx = await knowmusiqAdminDB
        .collection("ragas")
        .where("idx", "==", idxKey)
        .get();

    const suggestions = snapByIdx.docs.map((doc) => ({
        label: doc.data().name,
        href: `/ragas/${doc.data().slug}`,
    }));

    return {
        type: "suggestions",
        items: suggestions,
    };
}
