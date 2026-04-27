"use client";

import ClientWrap from "@/components/ClientWrap";
import { auth } from "@/lib/client/firebaseKM.client";
import { signOut } from "firebase/auth";

export default function SignOutButton() {
    return (
        <ClientWrap >
            <div className="bg-(--surface) mt-4 p-4 rounded-sm flex flex-col gap-4 items-center">
                <p>Do you want to sign out?</p>
                <button
                    onClick={() => {
                        signOut(auth);
                        window.location.href = "/auth/signin"
                    }}
                    className="btn btn-outline w-fit hover:bg-my-hilite"                >
                    Yes sign Out!
                </button>
            </div>
        </ClientWrap>
    );
}
