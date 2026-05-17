import ClientWrap from "@/components/ClientWrap";
import ItemList from "@/components/ItemList";
import RagaCard from "@/components/RagaCard";
import { toCamelCase } from "@/lib/string/camelcase";
import { slugify } from "@/lib/string/slugify";
import { getChords } from "@/lib/music/GenerateChords";
import { getRaga } from "@/lib/database/ragaLookup";
import { knowmusiqAdminDB } from "@/lib/server/knowmusiqAdmin";
import AddVideo from "@/components/AddVideo";
import Link from "next/link";
import { deSlug } from "@/lib/string/deSlugify";

export default async function KrithiPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const slugy = slugify(slug);


    const displayName = toCamelCase(deSlug(slug));

    const snaps = await knowmusiqAdminDB.collection("krithis")
        .where("slug", "==", slugy).get()

    if (snaps.empty) {
        return (
            <ClientWrap >
                <p> Krithi not found </p>
            </ClientWrap>
        )
    }
    const krithi = snaps.docs[0].data();
    const displayRaga = toCamelCase(deSlug(krithi.raga));

    // const chords = getChords(raga.arohana, raga.avarohana);

    // chords.scale.forEach((note) => {
    //     const ch = chords.chords[note];
    // })

    return (
        <ClientWrap >
            <div className="flex flex-col gap-1 bg-(--surface) p-6 rounded-lg w-fit min-w-3xl mx-auto">
                <p className="text-xl border-b border-b-gray-500">{displayName}</p>
                <p>Composer: {toCamelCase(krithi.comp)}</p>
                <Link href={`/raga/${slugify(krithi.raga)}`}
                    className="text-(--primary) cursor-pointer">
                    <p>Raga: {displayRaga}</p>
                </Link>
                <p>Tala: {toCamelCase(krithi.tala)}</p>
                <p>{toCamelCase(krithi.lang)}</p>
                <p>{krithi.type}</p>
                <div className="p-2 border-t border-t-gray-500 mt-2">
                    <AddVideo key={displayName} type="krit" name={displayName} slug={slugy} src={`/krithi/${slugy}`} raga={displayRaga} />
                </div>
            </div>
        </ClientWrap>
    );
}
