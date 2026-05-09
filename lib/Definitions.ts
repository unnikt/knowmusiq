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