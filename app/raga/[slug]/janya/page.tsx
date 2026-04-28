
import ClientWrap from "@/components/ClientWrap";
import ItemList from "@/components/ItemList";
import RagaCard from "@/components/RagaCard";
import RagaClient from "@/components/RagaClient";
import TopBar from "@/components/TopBar";
import { knowmusiqAdminDB } from "@/lib/server/knowmusiqAdmin";
import { toCamelCase } from "@/lib/string/camelcase";
import { slugify } from "@/lib/string/slugify";

export default async function RagaPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const slugy = slugify(slug);

    const displayName = toCamelCase(slug.replace(/%20/g, " "))

    const snapRagas = await knowmusiqAdminDB.collection("ragas")
        .where("slug", "==", slugy)
        .limit(1)
        .get();

    const janyaRagas = await knowmusiqAdminDB.collection("ragas")
        .where("pid", "==", snapRagas.docs[0].data().rid)
        .get();

    if (janyaRagas.empty) {
        return (
            <div className="mt-4">
                <p>No janya ragas found for {displayName}</p>
            </div>
        );
    }
    const raga = snapRagas.docs[0].data();

    const janyaItems = janyaRagas.docs.map((doc) => ({ label: doc.data().name, href: `/raga/${doc.data().slug}` }));

    return (
        <ClientWrap>
            <TopBar />
            <RagaCard
                name={displayName}
                type={raga.type}
                rid={raga.rid}
                pid={raga.pid}
                description={"A beautiful raga for every occasion.."}
                parent={{ name: raga.parent, slug: slugify(raga.parent) }} // { name, slug }
                arohana={raga.arohana}
                avarohana={raga.avarohana}
                display={"janya"}
            />

            <ItemList items={janyaItems} title={`Janya ragas of ${displayName}`} pageSize={10} showIndex={true} />
        </ClientWrap>
    );
}