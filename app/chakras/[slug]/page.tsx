"use client";

import { use, useEffect, useState } from "react";
import ClientWrap from "@/components/ClientWrap";
import ItemList from "@/components/ItemList";
import { useRouter } from "next/navigation";
import TopBar from "@/components/TopBar";
import DropDownMenu from "@/components/MenuDrop";
import { deSlug } from "@/lib/string/deSlugify";
import { malayalam } from "@/app/ui/fonts";

export default function ChakraPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params); // "Indu%20Madhyama" or "Agni" or "Veda"
    const currentPage = slug.replace(/%20/g, " ").split(" ")[0]; // "Indu" or "Agni" or "Veda"

    const [items, setItems] = useState([]);
    const router = useRouter();
    const Chakras = ["Indu", "Netra", "Agni", "Veda", "Bana", "Rutu", "Rishi", "Vasu", "Brahma", "Disi", "Rudra", "Aditya"];

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
        <ClientWrap >
            <TopBar />
            <DropDownMenu label={deSlug(slug)} items={Chakras} onSelect={(p) => handleClick(p)} />
            <ItemList title={""} items={items} />
            <p className={`${malayalam.className}`}></p>

        </ClientWrap>
    );
}
