"use client";

import { auth, googleProvider } from "@/lib/firebaseKM.client";
import { signInWithPopup } from "firebase/auth";
import Image from "next/image";
import { useState } from "react";

export default function GoogleSignInButton() {
    const [loading, setLoading] = useState(false);

    async function handleGoogleSignIn() {
        setLoading(true);
        try {
            await signInWithPopup(auth, googleProvider);
            window.location.href = "/";
        } catch (err) {
            console.error("Google sign-in error:", err);
        } finally {
            setLoading(false);
        }
    }

    return (
        <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="
        flex items-center justify-center gap-3
        w-full border border-gray-300
        bg-white text-gray-700
        py-2 px-4 rounded-md
        hover:bg-gray-50
        transition
      "
            style={{
                fontFamily: "Roboto, sans-serif",
                fontWeight: 500,
            }}
        >
            <Image
                src="/google-logo.svg"
                alt="Google logo"
                width={18}
                height={18}
            />
            {loading ? "Signing in…" : "Sign in with Google"}
        </button>
    );
}
