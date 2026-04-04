export function getVideoId(url: string): string | null {
    try {
        const u = new URL(url);
        return (u.hostname.includes("youtu.be")) ?
            u.pathname.slice(1) : u.searchParams.get("v");
    } catch {
        return null;
    }
};