"use client";
import AddVideo from "@/components/AddVideo";
import { xRef } from "@/lib/const/MapValues";
import Link from "next/link";
import { useState } from "react";

interface Props {
    slug: string;
    name: string;
    type: string;
    image?: string;
    wiki?: string;
    bio?: string;
}
export default function BioPage({ slug, name, type, image, wiki, bio }: Props) {
    const [expand, setExpand] = useState(false);
    return (
        <div>
            < div className="flex justify-between items-center gap-4 px-2" >
                <button
                    className="text-xl text-(--primary) border-b border-(--primary) mb-2"
                    onClick={() => setExpand(prev => !prev)}>
                    {name}
                </button>
                <AddVideo slug={slug} name={name} type={type} />
            </div >
            {expand &&
                <div className="p-4 flex flex-col rounded-md bg-(--surface) ">
                    <div className="flex gap-2 text-(--primary) pb-1">
                        {/* Profession */}
                        <Link
                            href={`/persons/type/${xRef(type)}s`}>
                            {xRef(type) || "Musician"}
                        </Link>
                        <span className="text-(--primary)/40">|</span>
                        {wiki &&
                            <Link
                                href={`https://en.wikipedia.org/wiki/${wiki}`}>
                                Source: Wikipedia
                            </Link>}
                    </div>

                    <div className="relative">
                        {/* Profile Picture */}
                        <div className="float-left w-48 h-auto">
                            <img
                                src={image || "/no_profile_pic.jpg"}
                                alt={name}
                                width={180}
                                height={180}
                                className=" rounded-sm object-cover mt-1"
                            />
                        </div>
                        {/* Bio */}
                        <p>{bio}</p>
                    </div>
                </div>}
        </div >

    );
}