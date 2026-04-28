import BackButton from "@/components/BackButton";
import ClientWrap from "@/components/ClientWrap";
import ItemList from "@/components/ItemList";
import RagaCard from "@/components/RagaCard";
import { toCamelCase } from "@/lib/string/camelcase";
import { knowmusiqAdminDB } from "@/lib/server/knowmusiqAdmin";
import { slugify } from "@/lib/string/slugify";
import TopBar from "@/components/TopBar";

export default async function KrithisPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const slugy = slugify(slug);

    const displayName = toCamelCase(slug.replace(/%20/g, " "))

    const snapRagas = await knowmusiqAdminDB.collection("ragas")
        .where("slug", "==", slugy)
        .limit(1)
        .get();

    if (snapRagas.empty) {
        const snapRagas = await knowmusiqAdminDB.collection("ragas")
            .where("idx", "==", slugy.toUpperCase().slice(0, 3)) // for melakarta search by idx
            .get();
        const items = snapRagas.docs.map((doc) => ({ label: doc.data().name, href: `/raga/${doc.data().slug}` }));
        return (
            <ClientWrap >
                <TopBar />
                <ItemList
                    title="Did you mean?"
                    items={items}
                />
            </ClientWrap>
        )
    }
    const raga = snapRagas.docs[0].data();

    const snap = await knowmusiqAdminDB
        .collection("krithis")
        .where("raga", "==", slugify(slug))
        .orderBy("name")
        .get();

    const items = snap.docs.map((doc) => ({
        label: doc.data().name,
        href: `/krithis/${doc.data().slug}`,
    }));

    return (
        <ClientWrap >
            <TopBar children />
            <RagaCard
                name={displayName}
                type={raga.type}
                rid={raga.rid}
                pid={raga.pid}
                description={"A beautiful raga for every occasion.."}
                parent={{ name: raga.parent, slug: slugify(raga.parent) }} // { name, slug }
                arohana={raga.arohana}
                avarohana={raga.avarohana}
                display={"krithis"}
            />
            {items.length > 0 &&
                <ItemList items={items} title={`Krithis in ${displayName}`} pageSize={10} />
                || <p className="bg-(--surface) p-4 rounded">No krithis available for this raga.</p>}
        </ClientWrap>
    );
}
