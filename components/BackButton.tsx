// components/BackButton.tsx
"use client";

import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  return (
    <button
      onClick={() => router.back()}
      className="text-purple-600 hover:text-purple-700 text-sm font-medium my-2"
    >
      ← Back
    </button>
  );
}