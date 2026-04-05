"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import ClientWrap from "@/components/ClientWrap";
import { auth } from "@/lib/firebaseKM.client";

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
            await signInWithEmailAndPassword(auth, email, password);
            window.location.href = "/"; // redirect after login
        } catch (err: any) {
            setError(err.message || "Failed to sign in");
        } finally {
            setLoading(false);
        }
    }

    return (
        <ClientWrap minimiseHeader={true}>
            <div className="flex justify-center items-center min-h-screen bg-gray-50">
                <div className="bg-white p-8 rounded shadow-md w-80 space-y-4">
                    <h2 className="font-semibold text-xl text-slate-600">Sign In</h2>

                    {error && <p className="text-red-600 text-sm">{error}</p>}

                    {/* Google Sign-In */}
                    <GoogleSignInButton />

                    <div className="text-center text-gray-400 text-sm">or</div>

                    {/* Email Sign-In */}
                    <form onSubmit={handleEmailSignIn} className="space-y-3">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full border p-2 rounded"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            autoComplete="email"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full border p-2 rounded"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            autoComplete="current-password"
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
            </div>
        </ClientWrap>
    );
}
