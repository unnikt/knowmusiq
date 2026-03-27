// app/page.tsx

import MinimiseButton from "@/components/MinimiseButton";

export default function Home() {
  const message = process.env["MESSAGE"] || "Scroll ends here...";

  return (
    <main>
      {/* <p className="p-4 text-gray-400">{message}</p> */}
      <section className="flex  justify-center">
        <i className="text-slate-400 py-4">Click <MinimiseButton /> to toggle header</i>
      </section>
    </main>
  );
}
