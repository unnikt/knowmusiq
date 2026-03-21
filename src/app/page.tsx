// app/page.tsx
import Link from "next/link.js";
import SearchBox from "../components/SearchBox";
import RagaCard from "@/components/RagaCard";

export default function Home() {
  const message = process.env["MESSAGE"] || "Scroll ends here...";

  return (
    <main>
      <p className="p-4 text-gray-400">{message}</p>
      <section className="features">
        <p>Testing 1</p>
      </section>
    </main>
  );
}
