
"use client"
import { use, useEffect, useState } from "react";
import ClientWrap from "@/components/ClientWrap";
import ItemList from "@/components/ItemList";
import Paginate from "@/components/Paginate";
import { useRouter } from "next/navigation";
import { toCamelCase } from "@/lib/string/camelcase";
import AddButton from "@/components/ButtonAdd";
import TopBar from "@/components/TopBar";
import { UserPlusIcon } from "@heroicons/react/20/solid";

export default function PersonsPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = use(params);
    const currentPage = toCamelCase(slug.replace(/%20/g, " ").split(" ")[0]);

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

    return (
        <ClientWrap >
            <TopBar />
            <div className="flex justify-items-start items-center  gap-7">
                <Paginate
                    currentPage={currentPage}
                    pages={["Composers", "Singers", "Lyricists"]}
                    onPageChange={(p) => router.push(`/persons/type/${p}`)}
                />
                <UserPlusIcon className="h-6 w-6 ml-5 text-(--primary)"
                    onClick={() => router.push("/client/AddPerson")} />
            </div>

            <ItemList title={""} items={items} pageSize={10} showIndex={true} />
        </ClientWrap>
    );
}
