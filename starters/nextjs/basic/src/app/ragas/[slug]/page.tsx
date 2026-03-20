// app/raga/[slug]/page.tsx
import { adminDb } from "@/lib/firebase-admin";
import { slugify } from "@/lib/slugify";
import RagaCard from "@/components/RagaCard";
import VideoTile from "@/components/VideoTile";

export default async function RagaPage({ params }: { params: Promise<{ slug: string }> }) {

    const { slug } = await params;
    const slugy = slugify(slug);

    const snap = await adminDb.collection("ragas")
        .where("slug", "==", slugy)
        .limit(1)
        .get();

    if (snap.empty) {
        return <div>
            <RagaCard
                name={slug.replace(/%20/g, " ")}
                type=""
                description="Not found..!"
                arohanam=""
                avarohanam=""
                parent={{ name: "", slug: "" }} // {name, slug}
            />
        </div>;
    }

    const raga = snap.docs[0].data();
    const snapshot = await adminDb.collection("videos")
        .where("tags.raga", "==", slug.replace(/%20/g, " "))
        .get();
    const videos = snapshot.docs.map((doc) => doc.data());

    return (
        <div className="p-8">
            <RagaCard
                name={slug.replace(/%20/g, " ")}
                type={raga.Type}
                description={"A beautiful raga for every occasion.."}
                parent={{ name: raga.Parent, slug: raga.Parent }} // { name, slug }
                arohanam={raga.Arohana}
                avarohanam={raga.Avarohana}
            />
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {videos.map((video) => (
                    <VideoTile key={video.id} video={video} />
                ))}
            </div>
        </div>
    );
}