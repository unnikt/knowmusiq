// app/raga/[slug]/page.tsx
import { shruthiAdmin } from "@/lib/shruthiAdmin";
import { slugify } from "@/lib/slugify";
import VideoTile from "@/components/VideoTile";
import { toCamelCase } from "@/lib/camelcase";
import BackButton from "@/components/BackButton";
import ClientWrap from "@/components/ClientWrap";
import { knowmusiqAdmin } from "@/lib/knowmusiqAdmin";
import RagaCard from "@/components/RagaCard";
import ItemList from "@/components/ItemList";

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

    const snapVideos = await shruthiAdmin.collection("videos")
        .where("tags.raga", "==", displayName)
        .limit(20)
        .get();
    const videos = snapVideos.docs.map((doc) => ({ id: doc.id, videoId: doc.data(), ...doc.data() }));

    console.log("Fetched Videos count= ", videos.length)

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
                />
                {videos.length > 0 &&
                    <div>
                        <h2 className=" my-4 text-gray-600">Songs in <span className="font-bold text-xl text-my-accent">{displayName}</span> </h2>

                        <div className="videoGrid">
                            {videos.map((video) => (
                                <VideoTile key={video.id} video={video} url={`https://www.youtube.com/watch?v=${video.videoId}`} target={"_blank"} />
                            ))}
                        </div>
                    </div>
                }
            </div>
        </ClientWrap>
    );
}