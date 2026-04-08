import { toCamelCase } from "@/lib/camelcase"
import Link from "next/link";

interface ProfileMenuProps {
    user: string;
    rights: string[];
}

export default function ProfileMenu(
    { user, rights }: ProfileMenuProps) {
    return (
        <div className="bg-slate-100 p-2 absolute right-0 shadow  min-w-70 mt-1 rounded-sm">
            {user && (
                <div>
                    <h2 className="text-slate-700 py-2 font-semibold border-b-2 border-b-my-secondary">{toCamelCase(user)}</h2>
                    <div className="flex my-4">Rights:
                        {rights.map(r => (
                            <span key={r} className="pl-1">{toCamelCase(r) + ","}</span>
                        ))}
                    </div>
                </div>
            )}
            <div className="border-t mt-2 pt-2 border-t-slate-300">
                <Link
                    href={user ? "/auth/signout" : "/auth/signin"}
                    className="text-my-primary">
                    {user ? "Sign out" : "Sign in"}

                </Link>
            </div>
        </div>
    )
}