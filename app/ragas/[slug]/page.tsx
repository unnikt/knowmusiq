// app/raga/[slug]/page.tsx
import { shruthiDB } from "../../../lib/firebase-admin";
import { slugify } from "../../../lib/slugify";
import RagaCard from "../../../components/RagaCard";
import VideoTile from "@/components/VideoTile";
import { toCamelCase } from "@/lib/camelcase";
import BackButton from "@/components/BackButton";
import ClientWrap from "@/components/ClientWrap";

export default async function RagaPage({ params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params;
    const slugy = slugify(slug);
    const displayName = toCamelCase(slug.replace(/%20/g, " "))

    const snapRagas = await shruthiDB.collection("ragas")
        .where("slug", "==", slugy)
        .limit(1)
        .get();
    if (snapRagas.empty) {
        return (
            <div className="p-8">
                <RagaCard
                    name={displayName}
                    type=""
                    description="Not found..!"
                    arohana=""
                    avarohana=""
                    parent={{ name: "", slug: "" }} // {name, slug}
                />
            </div>)
    }
    const raga = snapRagas.docs[0].data();


    const snapVideos = await shruthiDB.collection("videos")
        .where("tags.raga", "==", displayName)
        .limit(20)
        .get();
    const videos = snapVideos.docs.map((doc) => ({ id: doc.id, videoId: doc.data(), ...doc.data() }));

    console.log("Fetched Videos count= ", videos.length)

    if (videos.length > 0)
        return (
            <div className="p-8">
                <BackButton />
                <RagaCard
                    name={displayName}
                    type={raga.Type}
                    description={"A beautiful raga for every occasion.."}
                    parent={{ name: raga.Parent, slug: raga.Parent }} // { name, slug }
                    arohana={raga.Arohana}
                    avarohana={raga.Avarohana}
                />
                <h2 className=" my-4 text-gray-600">Songs in raga <span className="font-bold text-xl text-my-accent">{displayName}</span> </h2>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {videos.map((video) => (
                        <VideoTile key={video.id} video={video} url={`https://www.youtube.com/watch?v=${video.videoId}`} target={"_blank"} />
                    ))}
                </div>
            </div>
        );
    else
        return (
            <ClientWrap minimiseHeader={true}>
                <div className="p-8">
                    <RagaCard
                        name={displayName}
                        type={raga.Type}
                        description={"A beautiful raga for every occasion.."}
                        parent={{ name: raga.Parent, slug: raga.Parent }} // { name, slug }
                        arohana={raga.Arohana}
                        avarohana={raga.Avarohana}
                    />
                </div>
            </ClientWrap>
        );
}