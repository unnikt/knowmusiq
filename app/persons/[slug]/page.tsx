import { knowmusiqAdminDB } from "@/lib/server/knowmusiqAdmin";
import { slugify } from "@/lib/string/slugify";
import ClientWrap from "@/components/ClientWrap";
import VideoTile from "@/components/VideoTile";
import TopBar from "@/components/TopBar";
import { getWikiSummary } from "@/lib/wiki/wiki";
import BioPage from "@/app/ui/BioPage";

export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const slugy = slugify(slug);

    // Fetch person by slug
    const snap = await knowmusiqAdminDB
        .collection("persons")
        .where("slug", "==", slugy)
        .limit(1)
        .get();

    if (snap.empty) {
        return <div className="p-10 text-center text-gray-500">Person not found</div>;
    }

    const person = snap.docs[0].data();
    // Fetch Wikipedia summary
    const wiki = await getWikiSummary(person.wiki);
    const bio = person.bio || wiki.summary || "No biography available.";

    const snapshot = await knowmusiqAdminDB.collection("videos").where(person.type, "==", person.name).limit(20).get();
    const videos = snapshot.docs.map((doc) => ({ id: doc.id, videoId: doc.data().videoId, ...doc.data() }));


    return (
        <ClientWrap >
            <TopBar />
            <BioPage
                slug={slug}
                name={person.name}
                type={person.type}
                bio={bio}
                wiki={person.wiki}
                image={wiki.pic}
            />
            <div className="videoGrid">
                {videos.map((video) => (
                    <VideoTile key={video.id} video={video} width=""
                        url={`/videos/${video.videoId}`}
                        target={"_self"}
                        link={`${person.type === "comp" ? "lyri" : "comp"}|raga`} />
                ))}
            </div>
        </ClientWrap>
    );
}
