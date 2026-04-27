// app/raga/[slug]/page.tsx
import { slugify } from "@/lib/string/slugify";
import { toCamelCase } from "@/lib/string/camelcase";
import ClientWrap from "@/components/ClientWrap";
import { knowmusiqAdminDB } from "@/lib/server/knowmusiqAdmin";
import ItemList from "@/components/ItemList";
import RagaClient from "@/components/RagaClient";
import TopBar from "@/components/TopBar";

// export const metadata = {
//     title: {
//         default: "musiq-me.com",
//         template: "%s | musiq-me.com",
//     },
//     openGraph: {
//         type: "website",
//         siteName: "musiq-me.com",
//         images: ["https://musiq-me.com/og-default.png"],
//         description: "Learn about Carnatic and Hindustani ragas by exploring their use in movie songs!!",
//         url: "https://musiq-me.com/",
//     },
//     twitter: {
//         card: "summary_large_image",
//         site: "@musiq-me",
//         images: ["https://musiq-me.com/og-default.png"],
//     },
// };



export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
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
    console.log(raga)

    return {
        title: raga.name,
        description: `Learn about ${raga.name} by exploring songs composed in this raga`,
        openGraph: {
            title: raga.name,
            description: `Learn about ${raga.name} by exploring songs composed in this raga`,
            url: `https://musiq-me.com/ragas/${slug}`,
            type: "article",
            images: [
                {
                    url: "https://musiq-me.com/og-default.png",
                    width: 1200,
                    height: 630,
                    alt: `${raga.name} raga OG image`,
                }
            ]
        },
        twitter: {
            card: "summary_large_image",
            title: raga.name,
            description: `Learn about ${raga.name} by exploring songs composed in this raga`,
            images: ["https://musiq-me.com/og-default.png"]
        }
    };
}

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

