"use client"
import { useEffect, useRef, useState } from "react";
import { useApp } from "@/context/AppContext";
import { useUser } from "@/hooks/useUser"
import MainMenu from "./MainMenu";
import Image from "next/image";
import SearchBox from "./SearchBox"
import MinimiseButton from "./MinimiseButton";
import Link from "next/link";
import { Bars3Icon, HomeIcon, MagnifyingGlassIcon, UserCircleIcon } from "@heroicons/react/20/solid";

const links = [
    // { name: 'Home', href: '/' },
    // { name: 'Videos', href: '/videos' },
    // { name: 'Personalities', href: '/persons/type/Composers' },
    // { name: 'Search and tag videos', href: '/SearchVideos' },
    // { name: 'Tags videos', href: '/videos/tag' },
    // { name: 'About us', href: '#' },
]
const stats = [
    { name: 'Languages', value: '12' },
    { name: 'Ragas tagged', value: '300+' },
    { name: 'Videos tagged', value: '4000+' },
    { name: 'Ragas', value: 'Unlimited' },
]

export default function Header() {
    const { minimiseHeader } = useApp();
    const [minimise, setMinimise] = useState(minimiseHeader);
    const [open, setOpen] = useState(false)
    const [userName, setName] = useState(null);

    const { user, rights, loading } = useUser();

    useEffect(() => {
        setMinimise(minimiseHeader);
    }, [minimiseHeader]);

    useEffect(() => {
        if (!loading) {
            setName(user?.displayName ?? null);
        }
    }, [loading, user]);

    const menuRef = useRef(null);

    useEffect(() => {
        function handleClickOutside(e) {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div>
            <section className="py-1! bg-slate-800  relative  section-mid rounded-t-lg" >
                <Image
                    alt=""
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=indigo&shade=500"
                    fill
                    className="absolute inset-0 -z-10 size-full object-cover object-right opacity-20 md:object-center"
                    priority
                />
                <div className="mb-2 px-2 flex justify-between items-center  ">
                    <div ref={menuRef} className="relative">
                        <Bars3Icon className="w-7 h-7 text-white"
                            onClick={() => setOpen(prev => !prev)} />
                        {open && <MainMenu onClose={() => setOpen(false)} />}

                    </div>

                    <h2 className="text-2xl font-semibold tracking-tight text-white">
                        musiq me
                    </h2>

                    <div className="flex justify-between items-center gap-2">
                        <MagnifyingGlassIcon
                            className="w-7 h-7 text-white"
                            onClick={() => { setMinimise(prev => !prev) }} />
                    </div>
                </div>
            </section>
            <section className={minimise ? "hidden" : "" + "px-4 py-2 border-b border-my-secondary bg-slate-100 section-mid"} >
                <SearchBox />
            </section>

            {/* <div
                aria-hidden="true"
                className=" hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-15"
                />
                <p>Test</p>
            </div> */}
            {/* <div
                aria-hidden="false"
                className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:-top-112 sm:ml-16 sm:translate-x-0"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="aspect-1097/845 w-274.25 bg-linear-to-tr from-[#ff4694] to-[#776fff] opacity-15"
                />
            </div> */}


        </div >
    )
}
