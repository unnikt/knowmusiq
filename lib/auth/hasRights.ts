import { requireRole } from "./requireRole";
import { verifyUser } from "./verifyUser";

export async function hasRights(req: Request, roles: string[]) {

    try {
        // 1. Authenticate
        const user = await verifyUser(req);
        // 2. Authorize
        requireRole(user.decoded, ["admin", "tagEditor"]);
        return true;

    } catch (err) {
        console.error("hasRights error:", err);
        return false;
    }
}
