// app/raga/[slug]/page.tsx
import { shruthiDB } from "../../../lib/shruthiAdmin";
import { slugify } from "../../../lib/slugify";
import RagaCard from "../../../components/RagaCard";
import VideoTile from "@/components/VideoTile";
import { toCamelCase } from "@/lib/camelcase";
import BackButton from "@/components/BackButton";
import ClientWrap from "@/components/ClientWrap";
import { knowmusiqAdmin } from "@/lib/knowmusiqAdmin";

export default async function RagaPage({ params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params;
    const slugy = slugify(slug);
    const displayName = toCamelCase(slug.replace(/%20/g, " "))

    const snapRagas = await knowmusiqAdmin.collection("ragas")
        .where("slug", "==", slugy)
        .limit(1)
        .get();

    if (snapRagas.empty) {
        return (
            <ClientWrap minimiseHeader={true}>
                <div className="section-mid">
                    <RagaCard
                        name={displayName}
                        type=""
                        description="Not found.. try with a different spelling.."
                        arohana=""
                        avarohana=""
                        parent={{ name: "", slug: "" }} // {name, slug}
                    />
                </div>
            </ClientWrap>
        )
    }
    const raga = snapRagas.docs[0].data();


    const snapVideos = await shruthiDB.collection("videos")
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
                    description={"A beautiful raga for every occasion.."}
                    parent={{ name: raga.parent, slug: raga.parent }} // { name, slug }
                    arohana={raga.arohana}
                    avarohana={raga.avarohana}
                />
                {videos.length &&
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
    // else
    //     return (
    //         <div className="p-8">
    //             <RagaCard
    //                 name={displayName}
    //                 type={raga.type}
    //                 description={"A beautiful raga for every occasion.."}
    //                 parent={{ name: raga.Parent, slug: raga.Parent }} // { name, slug }
    //                 arohana={raga.Arohana}
    //                 avarohana={raga.Avarohana}
    //             />
    //         </div>
    //     );
}