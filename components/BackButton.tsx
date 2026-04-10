// components/BackButton.tsx
"use client";

import { useRouter } from "next/navigation";

export default function BackButton({ url }: { url?: string }) {
  const router = useRouter();

  const handleClick = () => {
    if (url) {
      router.push(url);
    } else {
      router.back();
    }
  };

  return (
    <button
      onClick={handleClick}
      className="text-purple-600 hover:text-purple-700 text-sm font-medium my-2"
    >
      ← Back
    </button>
  );
}
