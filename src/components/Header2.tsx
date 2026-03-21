// src/components/Header.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { MagnifyingGlassIcon, PlayIcon } from "@heroicons/react/24/solid";
import SearchBox from "./SearchBox";

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="w-full  top-0 left-0 z-50 backdrop-blur-md bg-white border-b border-white/10">
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between border-b-2 border-slate-300">

        {/* Logo / Brand */}
        <div className="flex items-center gap-2">
          <img src="/icon.svg" className="bg-gray-100 p-1 rounded-sm" alt="music-party" width="36" height="32" />
          <span className="text-3xl font-semibold text-white tracking-wide">musiq-me</span>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          <Link href="/" className=" text-white underline text-2xl hover:text-canva-secondary">Home</Link>
        </nav>

        {/* Search Bar */}
        <div className="hidden md:block">
          <SearchBox />
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-white" onClick={() => setOpen(!open)}>
          <svg width="28" height="28" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 7h20M4 14h20M4 21h20" />
          </svg>
        </button>
      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-6 pb-4 flex flex-col gap-1 bg-gray-300 backdrop-blur-md border-b border-white/10">
          <Link href="/" className="lnk-menu">Home</Link>
          <SearchBox />
        </div>
      )}
    </header>
  );
}