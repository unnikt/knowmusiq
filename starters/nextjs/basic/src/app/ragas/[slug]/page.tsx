// app/raga/[slug]/page.tsx
import { shruthiDB } from "@/lib/firebase-admin";
import { slugify } from "@/lib/slugify";
import RagaCard from "@/components/RagaCard";
import VideoTile from "@/components/VideoTile";

export default async function RagaPage({ params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params;
    const slugy = slugify(slug);
    const displayName = slug.replace(/%20/g, " ")

    const snapRagas = await shruthiDB.collection("ragas")
        .where("slug", "==", slugy)
        .limit(1)
        .get();
    const snapVideos = await shruthiDB.collection("videos")
        .where("tags.raga", "==", displayName)
        .limit(10)
        .get();

    if (snapRagas.empty) {
        return <div>
            <RagaCard
                name={displayName}
                type=""
                description="Not found..!"
                arohanam=""
                avarohanam=""
                parent={{ name: "", slug: "" }} // {name, slug}
            />
        </div>;
    }

    const raga = snapRagas.docs[0].data();
    const videos = snapVideos.docs.map((doc) => doc.data());
    if (videos.length > 0)
        return (
            <div className="p-8">
                <RagaCard
                    name={displayName}
                    type={raga.Type}
                    description={"A beautiful raga for every occasion.."}
                    parent={{ name: raga.Parent, slug: raga.Parent }} // { name, slug }
                    arohanam={raga.Arohana}
                    avarohanam={raga.Avarohana}
                />
                <h2 className="text-xl my-4 text-my-accent ">Songs in raga {displayName}</h2>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {videos.map((video) => (
                        <VideoTile key={video.id} video={video} />
                    ))}
                </div>
            </div>
        );
    else
        return (
            <div className="p-8">
                <RagaCard
                    name={displayName}
                    type={raga.Type}
                    description={"A beautiful raga for every occasion.."}
                    parent={{ name: raga.Parent, slug: raga.Parent }} // { name, slug }
                    arohanam={raga.Arohana}
                    avarohanam={raga.Avarohana}
                />
                <h2 className="text-xl my-4 text-my-accent ">No videos found!</h2>
            </div>
        );
}