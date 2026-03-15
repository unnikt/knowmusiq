"use client";

import Link from "next/link.js";
import { usePathname } from "next/navigation.js";

import { Arrow } from "./Arrow.jsx";
import { Firebase } from "./Firebase.jsx";

export function Header() {
  const pathname = usePathname();

  return (
    <>
      {pathname !== "/" && (
        <Link className="button back-button" href="/">
          <Arrow /> Back to home
        </Link>
      )}

      <header className="header">
        <Firebase />
      </header>
    </>
  );
}
