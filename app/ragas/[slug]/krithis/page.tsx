import BackButton from "@/components/BackButton";
import ClientWrap from "@/components/ClientWrap";
import ItemList from "@/components/ItemList";
import RagaCard from "@/components/RagaCard";
import { toCamelCase } from "@/lib/camelcase";
import { knowmusiqAdminDB } from "@/lib/knowmusiqAdmin";
import { slugify } from "@/lib/slugify";

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
        const items = snapRagas.docs.map((doc) => ({ label: doc.data().name, href: `/ragas/${doc.data().slug}` }));
        return (
            <ClientWrap minimiseHeader={true}>
                <div className="section-mid">
                    <BackButton />
                    <ItemList
                        title="Did you mean?"
                        items={items}
                    />
                </div>
            </ClientWrap>
        )
    }
    const raga = snapRagas.docs[0].data();

    const snap = await knowmusiqAdminDB
        .collection("krithis")
        .where("raga", "==", slugify(slug))
        .orderBy("name")
        .get();

    console.log("Fetched Krithis count= ", snap.size);

    const items = snap.docs.map((doc) => ({
        label: doc.data().name,
        href: `/krithis/${doc.data().slug}`,
    }));

    return (
        <ClientWrap minimiseHeader={true}>
            <div className="section-mid">
                <BackButton />
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
                    <div>
                        <h2 className=" my-4 text-gray-600">Krithis in <span className="font-bold text-xl text-my-accent">{displayName}</span> </h2>
                        <ItemList items={items} />
                    </div>
                    || <p className="text-gray-500">No krithis available for this raga.</p>}
            </div>
        </ClientWrap>
    );
}
