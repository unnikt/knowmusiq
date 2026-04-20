import { useState } from "react";
import { lookupPerson } from "../lib/wiki/lookupPerson";

export function usePersonLookup() {
    type WikiPerson = {
        pageId: number;
        title: string;
        thumbnail: string | null;
        extract: string;
    };
    const [results, setResults] = useState<WikiPerson[]>([]);
    const [loading, setLoading] = useState(false);

    const search = async (query: string) => {
        setLoading(true);
        const res = await lookupPerson(query);
        setResults(res);
        setLoading(false);
    };

    return { results, loading, search };
}
