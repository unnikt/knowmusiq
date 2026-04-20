export async function getWikiPic(title: string) {
    const url = `https://en.wikipedia.org/w/api.php?action=query&titles=${encodeURIComponent(
        title
    )}&prop=pageimages&piprop=original&format=json&origin=*`;

    const res = await fetch(url);
    const data = await res.json();

    const pages = data.query.pages;
    const page = pages[Object.keys(pages)[0]];

    return page.original?.source || null;
}
