import { requireRole } from "./requireRole";
import { verifyUser } from "./verifyUser";

export async function hasRights(req: Request, roles: string[]) {

    try {
        // 1. Authenticate
        const user = await verifyUser(req);
        // 2. Authorize
        const roles = requireRole(user.decoded, ["admin", "tagEditor"]);
        return { user: user.email, hasRights: true, roles: roles };

    } catch (err) {
        console.error("hasRights error:", err);
        return { user: null, hasRights: false, roles: null };
    }
}
