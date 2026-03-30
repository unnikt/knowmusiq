// app/page.tsx

import { ArrowsPointingOutIcon } from "@heroicons/react/20/solid";


export default function Home() {
  const message = process.env["MESSAGE"] || "Scroll ends here...";
  // const [minHeader, setMinimiseHeader] = useState(false);

  return (
    <main>
      {/* <p className="p-4 text-gray-400">{message}</p> */}
      <section className="flex justify-center items-center gap-2 mt-8 p-4 text-gray-400">
        <span>Click </span>
        <span><ArrowsPointingOutIcon className="h-5 w-5" /></span>
        <span> to expand the header</span>
        <img src="" alt="" />
      </section>
    </main>
  );
}
