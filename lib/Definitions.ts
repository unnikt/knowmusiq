export type Raga = {
    rid: string;
    pid: string;
    name: string;
    parent: string;
    arohana: string;
    avarohana: string;
    type: string;
    slug: string;
    description: string;
    user: {
        creator: string;
        editor: string;
    }
    timestamps: {
        created: string;
        modified: string;
    }
}

export type Video = {
    videoId: string;
    title: string;
    raga: string;
    comp: string;
    sing: string;
    lyri: string;
    movi: string;
    krit: string;
    user: string;
    updatedAt: number;
}
export type Krithi = {
    name: string;
    comp: string;
    raga: string;
    tala: string;
    lang: string;
    type: string;
    slug: string;
}

export type Query = {
    src: "videos" | "krithis" | "ragas" | "movies" | "persons";
    type: "Document" | "Collection";
    docId?: string;
    filter?:
    {
        field: string;
        value: string;
        op: "==" | "!=" | "<" | "<=" | ">" | ">=";
    }
}