"use client"

import { useUser } from "@/hooks/useUser";
import ClientWrap from "./ClientWrap"
import { toCamelCase } from "@/lib/string/camelcase";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function AccountPage() {
    const { user, rights, loading } = useUser();
    const router = useRouter();
    if (!user && !loading)
        router.push("/auth/signin")
    else
        return (
            <ClientWrap >
                <div className="section-mid">
                    {loading && <p className="text-my-primary p-2">{loading}</p>}
                    {user && (
                        <div>
                            <h2 className="text-slate-700 py-2 font-semibold border-b-2 border-b-my-secondary">{toCamelCase(user.displayName)}</h2>
                            <h4 className="mt-4 font-semibold">Rights:</h4>
                            <div className="flex flex-col">
                                {rights.map((r, i) => (
                                    <p key={r} className="p-2">{i + 1}. {toCamelCase(r) + ","}</p>
                                ))}
                            </div>
                        </div>
                    )}
                    <div className="border-t mt-2 pt-4 border-t-slate-300">
                        <Link
                            href={user ? "/auth/signout" : "/auth/signin"}
                            className=" text-my-primary btn btn-outline ">
                            {user ? "Sign out" : "Sign in"}
                        </Link>
                    </div>
                </div>
            </ClientWrap>
        )
}