import { knowmusiqAdminDB } from "@/lib/server/knowmusiqAdmin";
import { xRef } from "@/lib/MapValues";
import { slugify } from "@/lib/string/slugify";
import { getWikiSummary } from "@/lib/wiki";
import Image from "next/image";
import Link from "next/link";
import ClientWrap from "@/components/ClientWrap";
import { Accordion } from "@/components/Accordion";
import VideoTile from "@/components/VideoTile";
import AddVideo from "@/components/AddVideo";
import TopBar from "@/components/TopBar";

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
            <TopBar>
                <AddVideo slug={slug} name={person.name} type={"comp"} />
            </TopBar>
            <Accordion title={person.name}>
                <div className="p-2 flex flex-col sm:gap-4 sm:flex-row  sm:justify-items-start  bg-linear-90 from-blue-100 to-blue-300 rounded-b ">
                    <div className="flex flex-col justify-start ">
                        {/* Profile Picture */}
                        <Image
                            src={person.image || wiki.pic || "/no_profile_pic.jpg"}
                            alt={person.name}
                            width={180}
                            height={180}
                            className=" rounded-sm object-cover shadow-md sm:w-70 sm:h-70"
                        />
                        {/* Profession */}
                        <Link
                            href={`/persons/type/${xRef(person.type)}s`}
                            className="text-(--primary)  tracking-wide py-4"
                        >
                            {xRef(person.type) || "Musician"}
                        </Link>
                    </div>
                    <div>
                        {/* Bio */}
                        <p className=" text-gray-600 text-left max-w-xl">
                            {bio || "No biography available."}
                        </p>
                        {person.wiki && <Link
                            href={`https://en.wikipedia.org/wiki/${person.wiki}`}
                            className=" text-(--primary) hover:text-my-hilite">
                            Source: Wikipedia
                        </Link>}
                    </div>
                </div>
            </Accordion>
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
