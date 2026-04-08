"use client";

import ClientWrap from "@/components/ClientWrap";
import { auth } from "@/lib/client/firebaseKM.client";
import { Button } from "@headlessui/react";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";

export default function SignOutButton() {
    return (
        <ClientWrap minimiseHeader={true}>
            <div className="section-mid flex justify-center">
                <button
                    onClick={() => {
                        signOut(auth);
                        window.location.href = "/auth/signin"
                    }}
                    className="btn-outline"                >
                    Sign Out
                </button>
            </div>
        </ClientWrap>
    );
}
