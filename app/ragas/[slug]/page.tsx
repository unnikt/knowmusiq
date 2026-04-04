// app/raga/[slug]/page.tsx
import { shruthiAdmin } from "@/lib/shruthiAdmin";
import { slugify } from "@/lib/slugify";
import { toCamelCase } from "@/lib/camelcase";
import BackButton from "@/components/BackButton";
import ClientWrap from "@/components/ClientWrap";
import { knowmusiqAdmin } from "@/lib/knowmusiqAdmin";
import RagaCard from "@/components/RagaCard";
import ItemList from "@/components/ItemList";
import RagaVideos from "@/components/RagaVideos";

export default async function RagaPage({ params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params;
    const slugy = slugify(slug);

    const displayName = toCamelCase(slug.replace(/%20/g, " "))

    const snapRagas = await knowmusiqAdmin.collection("ragas")
        .where("slug", "==", slugy)
        .limit(1)
        .get();

    if (snapRagas.empty) {
        const snapRagas = await knowmusiqAdmin.collection("ragas")
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


    // console.log("Fetched Videos count= ", videos.length)
    // const handleSaveVideo = (videoId: string) => {
    //     console.log("Saved video:", videoId);
    //     // Add to list, send to API, etc.
    // };
    return (
        <ClientWrap minimiseHeader={true}>
            <div className="section-mid mb-0">
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
                    display={"videos"}
                />
                <RagaVideos slug={slugy} name={displayName} type={raga.type} />
            </div>
        </ClientWrap>
    );
}