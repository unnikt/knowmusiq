import { getAuth } from "firebase-admin/auth";

export interface AuthenticatedUser {
    uid: string;
    email?: string;
    claims: Record<string, any>;
}

export async function verifyUser(req: Request): Promise<AuthenticatedUser> {
    const authHeader = req.headers.get("authorization");

    if (!authHeader?.startsWith("Bearer ")) {
        throw new Error("MISSING_TOKEN");
    }

    const idToken = authHeader.split(" ")[1];

    try {
        const decoded = await getAuth().verifyIdToken(idToken);

        return {
            uid: decoded.uid,
            email: decoded.email,
            claims: decoded,
        };
    } catch {
        throw new Error("INVALID_TOKEN");
    }
}
