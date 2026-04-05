export function requireRole(decoded: any, roles: string[]) {
    const hasRole = roles.some((r) => decoded[r] === true);

    if (!hasRole) {
        throw new Error("FORBIDDEN");
    }
}
