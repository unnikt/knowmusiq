import EditRaga from "@/app/ui/EditRaga";
import ClientWrap from "@/components/ClientWrap";
import ItemList from "@/components/ItemList";
import { getRaga } from "@/lib/database/ragaLookup";
import { Raga } from "@/lib/Definitions";
import { slugify } from "@/lib/string/slugify";

export default async function KrithisPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const slugy = slugify(slug);

    const data = await getRaga(slugy);
    const raga = data?.raga as Raga

    if (data.type == "exact")
        return (
            <EditRaga raga={raga} />
        )

    const items = data.items;
    items.forEach(itm => itm.href = itm.href + "/edit")

    return (
        <ClientWrap>
            <ItemList items={items} title="Did you mean...?" className="p-8 bg-(--surface) rounded-lg" />
        </ClientWrap>
    )

}