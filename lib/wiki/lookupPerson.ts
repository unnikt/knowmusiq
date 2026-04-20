export async function lookupPerson(name: string) {
    if (!name.trim()) return [];

    const url = `https://en.wikipedia.org/w/api.php?action=query&format=json&origin=*&prop=pageimages|extracts&exintro&explaintext&piprop=thumbnail&pithumbsize=200&generator=prefixsearch&gpssearch=${encodeURIComponent(
        name
    )}&gpslimit=10`;

    const res = await fetch(url);
    const data = await res.json();

    if (!data.query?.pages) return [];

    return Object.values(data.query.pages).map((p: any) => ({
        pageId: p.pageid,
        title: p.title,
        thumbnail: p.thumbnail?.source || null,
        extract: p.extract || "",
    }));
}
