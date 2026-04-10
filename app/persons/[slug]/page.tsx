import BackButton from "@/components/BackButton";
import GetWikiName from "@/components/GetWikiName";
import PersonsClient from "@/components/PersonsClient";
import { knowmusiqAdminDB } from "@/lib/knowmusiqAdmin";
import { xRef } from "@/lib/MapValues";
import { slugify } from "@/lib/slugify";
import { getWikiSummary } from "@/lib/wiki";
import Image from "next/image";
import Link from "next/link";

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

    return (
        <div className="max-w-3xl mx-auto p-6">
            <BackButton url="/persons/type/composers" />
            <div className="bg-white  p-6 flex flex-col items-center text-center">
                {/* Profile Picture */}
                <Image
                    src={person.image || wiki.pic || "/no_profile_pic.jpg"}
                    alt={person.name}
                    width={180}
                    height={180}
                    className="w-40 h-40 rounded-sm object-cover shadow-md mb-4"
                />

                {/* Name */}
                <h2 className="text-3xl text-slate-700  tracking-wide">
                    {person.name}
                </h2>

                {/* Profession */}
                <Link
                    href={`/persons/type/${xRef(person.type)}s`}
                    className="text-pink-600 font-medium tracking-wide mt-1"
                >
                    {xRef(person.type) || "Musician"}
                </Link>

                {person.wiki && <Link
                    href={`https://en.wikipedia.org/wiki/${person.wiki}`}
                    className=" text-my-primary">Source: Wikipedia</Link>}

                {/* Bio */}
                <p className="mt-4 text-gray-600 text-left max-w-xl">
                    {bio || "No biography available."}
                </p>
                {!person.wiki &&
                    <PersonsClient src="persons" doc_id={person.slug} />
                }

                {/* Link to Music */}
                {person.musicLink && (
                    <a
                        href={person.musicLink}
                        target="_blank"
                        className="mt-6 inline-block bg-pink-500 text-white px-6 py-2 rounded-lg hover:bg-pink-600 transition"
                    >
                        Listen to Music
                    </a>
                )}
            </div>
        </div >
    );
}
