export function requireRole(user: any, roles: string[]) {
    const hasRole = roles.some((r) => user.claims[r] === true);

    if (!hasRole) {
        throw new Error("FORBIDDEN");
    }
}
