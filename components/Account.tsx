"use client"

import { useUser } from "@/hooks/useUser";
import ClientWrap from "./ClientWrap"
import { toCamelCase } from "@/lib/string/camelcase";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ItemList from "./ItemList";
import { useEffect } from "react";

export default function AccountPage() {
    const { user, rights, loading } = useUser();
    const router = useRouter();
    const links = [
        { label: "My uploads", href: "/user/videos" },
        { label: "My favourites", href: "/user/favourites" },
    ]
    const itmRights = rights.map(r => ({ label: toCamelCase(r), href: "" }))

    useEffect(() => {
        if (!loading && !user) {
            router.push("/auth/signin");
        }
    }, [loading, user, router]);

    if (loading) {
        return <ClientWrap><div>Loading…</div></ClientWrap>;
    }

    if (!user) {
        // While redirecting, render nothing
        return <ClientWrap>null</ClientWrap>;
        ;
    }

    return (
        <ClientWrap>
            <div className="card bg-(--surface) mt-4 rounded-lg p-8!">
                {loading && <p className="p-2">{loading}</p>}
                {user && (
                    <div>
                        <h2 className="subtitle border-b-my-secondary border-b py-2">{toCamelCase(user.displayName)}</h2>
                        <ItemList title="Rights" items={itmRights} showIndex={true} />
                        <ItemList title="My activity" items={links} />
                    </div>
                )}
                <div className="flex py-4 border-t  border-t-my-secondary">
                    <Link
                        href={"/auth/signout"}
                        className=" btn btn-accent">
                        Sign out
                    </Link>
                </div>
            </div>
        </ClientWrap>
    )
}