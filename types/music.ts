export interface Raga {
    slug: string;          // unique ID (doc ID)
    name: string;
    type?: string;         // janya / melakarta / etc.
    parent?: string;       // parent raga name
    pid?: number;          // parent ID
    rid?: number;          // raga ID
    idx?: number;          // index for sorting
    arohana?: string;
    avarohana?: string;
}

export interface Movie {
    id: string;            // Firestore doc ID
    name: string;
    year?: number;
    language?: string;     // link to Language.name
}

export interface Composer {
    id: string;
    name: string;
    aka?: string[];        // alternate names
    era?: string;          // optional (e.g., "20th century")
}

export interface Singer {
    id: string;
    name: string;
    gender?: "male" | "female" | "other";
    aka?: string[];
}

export interface Language {
    id: string;
    name: string;          // Tamil, Telugu, Malayalam, etc.
    isoCode?: string;      // optional (e.g., "ta", "te")
}
