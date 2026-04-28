"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import ClientWrap from "@/components/ClientWrap";
import { auth } from "@/lib/client/firebaseKM.client";
import TopBar from "@/components/TopBar";

export default function SignInPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleEmailSignIn(e: React.FormEvent) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            // 1️⃣ Sign in with Firebase client SDK
            const cred = await signInWithEmailAndPassword(auth, email, password);

            // 2️⃣ Get ID token from Firebase client user
            const idToken = await cred.user.getIdToken();

            // 3️⃣ Send ID token to server to create session cookie
            await fetch("/api/auth/session", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ idToken }),
            });
            // 4️⃣ Redirect
            window.location.href = "/user";
        } catch (err: any) {
            setError(err.message || "Failed to sign in");
        } finally {
            setLoading(false);
        }
    }

    return (
        <ClientWrap>
            <TopBar children={""} />

            <div className="mx-auto mt-4 bg-(--surface) p-8 rounded border border-slate-300 w-80 space-y-4">
                <h2 className="font-semibold text-xl text-center">Sign In</h2>

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <GoogleSignInButton />

                <p className="text-center">or</p>

                <form onSubmit={handleEmailSignIn} className="space-y-3">
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border border-gray-400 p-2 rounded"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border border-gray-400 p-2 rounded"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
                    >
                        {loading ? "Signing in…" : "Sign In"}
                    </button>
                </form>
            </div>
        </ClientWrap >
    );
}
