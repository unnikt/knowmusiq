export function xRef(str: string) {
    const MAP = {
        "Composer": "comp",
        "comp": "Composer",
        "Singer": "sing",
        "sing": "Singer",
        "Lyricist": "lyri",
        "lyri": "Lyricist",
        "persons": ["comp", "sing", "lyri"]
    }
    return MAP[str];
}
