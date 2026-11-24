export const Tags = [
    { key: "movi", label: "Movie", src: "movies", base: "/movie/", icon: "movie" },
    { key: "lang", label: "Language", src: "languages", base: "/language/", icon: "language" },
    { key: "comp", label: "Composer", src: "persons", base: "/persons/", icon: "music_note" },
    { key: "sing", label: "Singer", src: "persons", base: "/persons/", icon: "mic" },
    { key: "lyri", label: "Lyricist", src: "persons", base: "/persons/", icon: "text_snippet" },
    { key: "raga", label: "Raga", src: "ragas", base: "/raga/", icon: "music_note" },
    { key: "tala", label: "Tala", src: "talas", base: "/tala/", icon: "timer" },
    { key: "krit", label: "Krithi", src: "krithis", base: "/krithi/", icon: "music_note" },
];

export const TagLabel = (key: string) => {
    return Tags.find(t => t.key === key)?.label || key;
};

export const TagLinks = (key: string) => {
    let lnk = "";
    Tags.forEach(t => { if (t.key != key) lnk += t.key + "|" });

    return lnk.substring(0, lnk.length - 1)
}