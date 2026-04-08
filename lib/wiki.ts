export async function getWikiSummary(name: string) {
    const url = `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(
        name
    )}`;

    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) return null;

    const data = await res.json();
    if (data.title) console.log(data)
    return { summary: data.extract || null, pic: data.thumbnail?.source || null };
}
