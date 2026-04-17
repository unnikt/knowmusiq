
"use client"
import { use, useEffect, useState } from "react";
import BackButton from "@/components/BackButton";
import ClientWrap from "@/components/ClientWrap";
import ItemList from "@/components/ItemList";
import Paginate from "@/components/Paginate";
import { useRouter } from "next/navigation";
import { toCamelCase } from "@/lib/string/camelcase";

export default function PersonsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const currentPage = slug.replace(/%20/g, " ").split(" ")[0];

    const [items, setItems] = useState([]);
    const router = useRouter();

    useEffect(() => {
        async function load() {

            const res = await fetch(`/api/persons?key=type&value=${toCamelCase(currentPage.slice(0, currentPage.length - 1))}`);
            const data = await res.json();
            const items = data.values.map((item: { name: string; slug: string }) => ({
                label: item.name,
                href: `/persons/${item.slug}`,   // ← use slug, not name
            }));
            setItems(items);
        }
        load();
    }, [currentPage]);

    function handleClick(p) {
        router.push(`/persons/type/${p}`);
    }

    return (
        <ClientWrap >
            <div className="section-mid">
                <BackButton />
                <Paginate
                    currentPage={currentPage}
                    pages={["Composers", "Singers", "Lyricists"]}
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
