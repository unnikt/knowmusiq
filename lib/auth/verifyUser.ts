import { getKnowmusiqAdminAuth } from "@/lib/server/knowmusiqAdmin";

export async function verifyUser(req: Request) {
    const authHeader = req.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
        throw new Error("MISSING_TOKEN");
    }

    const idToken = authHeader.split(" ")[1];

    try {
        const decoded = (await getKnowmusiqAdminAuth()).verifyIdToken(idToken);

        return {
            uid: (await decoded).uid,
            email: (await decoded).email,
            decoded: decoded,
        };
    } catch (err) {
        console.error("verifyUser error:", err);
        throw new Error("INVALID_TOKEN");
    }
}
