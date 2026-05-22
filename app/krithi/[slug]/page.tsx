import ClientWrap from "@/components/ClientWrap";
import { toCamelCase } from "@/lib/string/camelcase";
import { slugify } from "@/lib/string/slugify";
import { knowmusiqAdminDB } from "@/lib/server/knowmusiqAdmin";
import { deSlug } from "@/lib/string/deSlugify";
import { Krithi, Query, Video } from "@/lib/Definitions";
import getData from "@/lib/database/getData";
import KritiPage from "@/app/client/KritiClient";

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
    const krithi = snaps.docs[0].data() as Krithi;

    const q: Query = {
        src: "videos",
        type: "Collection",
        docId: "",
        filter: {
            field: "krit",
            value: slugy,
            op: "=="
        }
    }

    const data = await getData(q);
    const videos = data.data as Video[] || [];

    return (
        <KritiPage krithi={krithi} videos={videos} />
    );
}
