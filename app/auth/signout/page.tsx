"use client";

import { auth } from "@/lib/firebaseKM.client";
import { signOut } from "firebase/auth";

export default function SignOutButton() {
    return (
        <button
            onClick={() => signOut(auth)}
            className="text-sm text-red-600 underline"
        >
            Sign Out
        </button>
    );
}
