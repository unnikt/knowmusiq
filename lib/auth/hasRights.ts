import { requireRole } from "./requireRole";
import { verifyUser } from "./verifyUser";

export async function hasRights(req: Request, rights: string[] = ["admin", "tagEditor"]) {

    try {
        // 1. Authenticate
        const user = await verifyUser(req);
        // 2. Authorize
        const result = rights.map(e => user.decoded[e] === true);
        // const roles = requireRole(user.decoded, rights);
        return { user: user.email, hasRights: true, rights: result };

    } catch (err) {
        console.error("hasRights error:", err);
        return { user: null, hasRights: false, roles: null };
    }
}
