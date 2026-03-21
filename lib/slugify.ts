export function slugify(name: string) {
    return name
        .toLowerCase()
        .normalize("NFD")
        .replace(/%20/g, "-")
        .replace(/[\u0300-\u036f]/g, "-")
        .replace(/[^a-z0-9\s-]/g, " ")
        .trim()
        .replace(/\s+/g, "-");
}