import BackButton from "@/components/BackButton";
import ClientWrap from "@/components/ClientWrap";
import ItemList from "@/components/ItemList";
import RagaCard from "@/components/RagaCard";
import { toCamelCase } from "@/lib/camelcase";
import { getRaga } from "@/lib/ragaLookup";
import { slugify } from "@/lib/slugify";
import { getChords } from "@/lib/GenerateChords";

export default async function KrithiPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const slugy = slugify(slug);


    const displayName = toCamelCase(slug.replace(/%20/g, " "))

    const results = await getRaga(slug);

    if (results.type === "suggestions") {
        return (
            <ClientWrap minimiseHeader={true}>
                <div className="section-mid">
                    <BackButton />
                    <ItemList
                        title="Did you mean?"
                        items={results.items}
                    />
                </div>
            </ClientWrap>
        )
    }
    const raga = results.raga;

    const chords = getChords(raga.arohana, raga.avarohana);

    chords.scale.forEach((note) => {
        const ch = chords.chords[note];
    })

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
                    display={"chords"}
                />
                <div className="card-new">
                    <p className="bg-slate-200 p-2">Notes: {chords.scale.join(" ")}</p>

                </div>
            </div>
        </ClientWrap>
    );
}
