// app/raga/[slug]/page.tsx
import { slugify } from "@/lib/string/slugify";
import { toCamelCase } from "@/lib/string/camelcase";
import ClientWrap from "@/components/ClientWrap";
import { knowmusiqAdminDB } from "@/lib/server/knowmusiqAdmin";
import ItemList from "@/components/ItemList";
import RagaClient from "@/components/RagaClient";
import TopBar from "@/components/TopBar";
import { getRaga } from "@/lib/ragaLookup";

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
            <ClientWrap>
                <TopBar children={""} />
                <ItemList
                    title="Did you mean?"
                    items={items}
                />
            </ClientWrap>
        )
    }
    const raga = snapRagas.docs[0].data();

    return (
        <RagaClient
            slug={slugy} name={displayName} type={raga.type}
            displayName={displayName}
            rid={raga.rid}
            pid={raga.pid}
            arohana={raga.arohana || ""}
            avarohana={raga.avarohana || ""}
            parent={raga.parent}
        />
    );
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const slugy = slugify(slug);

    const snapRagas = await knowmusiqAdminDB.collection("ragas")
        .where("slug", "==", slugy)
        .limit(1)
        .get();

    if (snapRagas.empty) {
        return {
            title: "Raga not found",
            description: "The requested raga could not be found.",
        };
    }
    const raga = snapRagas.docs[0].data();

    return {
        title: raga.name,
        description: raga.description || `Learn about the raga ${raga.name}.`,
        openGraph: {
            title: raga.name,
            description: raga.description || `Learn about the raga ${raga.name}.`,
            images: ["https://musiq-me.com/og-default.png"],
            url: `https://musiq-me.com/ragas/${params.slug}`,
            type: "article",
        },
        twitter: {
            card: "summary_large_image",
            images: ["https://musiq-me.com/og-default.png"],
        },
    };
}
