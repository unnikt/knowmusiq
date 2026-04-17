"use client";

import ClientWrap from "@/components/ClientWrap";
import { auth } from "@/lib/client/firebaseKM.client";
import { Button } from "@headlessui/react";
import { signOut } from "firebase/auth";
import Link from "next/link";
import { useState } from "react";

export default function SignOutButton() {
    return (
        <ClientWrap >
            <div className="section-mid">
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
