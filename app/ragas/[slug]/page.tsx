// app/raga/[slug]/page.tsx
import { shruthiAdmin } from "@/lib/server/shruthiAdmin";
import { slugify } from "@/lib/string/slugify";
import { toCamelCase } from "@/lib/string/camelcase";
import BackButton from "@/components/BackButton";
import ClientWrap from "@/components/ClientWrap";
import { knowmusiqAdminDB } from "@/lib/server/knowmusiqAdmin";
import RagaCard from "@/components/RagaCard";
import ItemList from "@/components/ItemList";
import RagaClient from "@/components/RagaClient";

export default async function RagaPage({ params }: { params: Promise<{ slug: string }> }) {

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
            <ClientWrap >
                <div className="section-mid">
                    <div className="flex justify-between align-middle items-center">
                        <BackButton />
                    </div>
                    <ItemList
                        title="Did you mean?"
                        items={items}
                    />
                </div>
            </ClientWrap>
        )
    }
    const raga = snapRagas.docs[0].data();

    return (
        <ClientWrap >
            <div className="section-mid mb-0">
                <BackButton />
                <RagaClient
                    slug={slugy} name={displayName} type={raga.type}
                    displayName={displayName}
                    rid={raga.rid}
                    pid={raga.pid}
                    arohana={raga.arohana || ""}
                    avarohana={raga.avarohana || ""}
                    parent={raga.parent}
                />
            </div>
        </ClientWrap>
    );
}