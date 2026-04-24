import BackButton from "@/components/BackButton";
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

export default async function ProfilePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;

    const slugy = slugify(slug);
    console.log("Loading profile for slug:", slug, "slugified:", slugy);

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

    console.log("Person data:", person);

    const snapshot = await knowmusiqAdminDB.collection("videos").where(person.type, "==", person.name).limit(20).get();
    const videos = snapshot.docs.map((doc) => ({ id: doc.id, videoId: doc.data().videoId, ...doc.data() }));


    return (
        <ClientWrap >
            <div className="section-mid px-2 sm:px-0">
                <div className="flex justify-center gap-4 items-center m-1">
                    <BackButton url={`/persons/type/${xRef(person.type)}s`} />
                    <AddVideo slug={slug} name={person.name} type={"comp"} />
                </div>

                <Accordion title={person.name}>
                    <div className="p-4 flex flex-col sm:flex-row  sm:justify-items-start  bg-linear-90 from-blue-100 to-blue-300 rounded-sm">
                        {/* Profile Picture */}
                        <Image
                            src={person.image || wiki.pic || "/no_profile_pic.jpg"}
                            alt={person.name}
                            width={180}
                            height={180}
                            className=" rounded-sm object-cover shadow-md mb-4 sm:w-70 sm:h-70"
                        />

                        {/* Name */}
                        <div className="flex flex-col justify-start ">
                            {/* Profession */}
                            <Link
                                href={`/persons/type/${xRef(person.type)}s`}
                                className="text-(--primary) tracking-wide mt-1"
                            >
                                {xRef(person.type) || "Musician"}
                            </Link>
                        </div>
                        {/* Bio */}
                        <p className="mt-4 text-gray-600 text-left max-w-xl">
                            {bio || "No biography available."}
                        </p>
                        {person.wiki && <Link
                            href={`https://en.wikipedia.org/wiki/${person.wiki}`}
                            className=" text-(--primary) hover:text-my-hilite">
                            Source: Wikipedia
                        </Link>}
                    </div>
                </Accordion>
                <div className="videoGrid">
                    {videos.map((video) => (
                        <VideoTile key={video.id} video={video} width=""
                            url={`/videos/tag/?v=${video.videoId}`}
                            target={"_self"}
                            link="raga" />
                    ))}
                </div>

            </div >
        </ClientWrap>
    );
}
