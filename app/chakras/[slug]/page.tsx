"use client";

import { use, useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import ClientWrap from "@/components/ClientWrap";
import ItemList from "@/components/ItemList";
import Paginate from "@/components/Paginate";
import { useRouter } from "next/navigation";

export default function ChakraPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params); // "Indu%20Madhyama" or "Agni" or "Veda"
    const currentPage = slug.replace(/%20/g, " ").split(" ")[0]; // "Indu" or "Agni" or "Veda"

    const [items, setItems] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function load() {
            const res = await fetch(`/api/ragas?parent=${currentPage} Chakra`);
            const json = await res.json();
            setItems(json.items);
        }
        load();
    }, [currentPage]);

    function handleClick(p) {
        router.push(`/chakras/${p} Chakra`);
    }

    return (
        <ClientWrap minimiseHeader={true}>
            <div className="section-mid">
                <BackButton />
                <Paginate
                    currentPage={currentPage}
                    pages={["Indu", "Netra", "Agni", "Veda", "Bana", "Rutu", "Rishi", "Vasu", "Brahma", "Disi", "Rudra", "Aditya"]}
                    onPageChange={(p) => handleClick(p)}
                />

                <ItemList
                    title={""}
                    items={items}
                />
            </div>
        </ClientWrap>
    );
}
