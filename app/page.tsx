// app/page.tsx

import ClientWrap from "@/components/ClientWrap";
import { ArrowsPointingOutIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { title } from "process";


export default function Home() {
  const message = process.env["MESSAGE"] || "Scroll ends here...";
  // const [minHeader, setMinimiseHeader] = useState(false);
  const items = [
    {
      name: "Chakra", id: "1",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Melakarta.katapayadi.sankhya.72_correction_for_no_41-47-53-59-65-71_da2-instead-of-da3.png/330px-Melakarta.katapayadi.sankhya.72_correction_for_no_41-47-53-59-65-71_da2-instead-of-da3.png",
      title: "Chakras", subtitle: "Subtitle",
      redirect: "/chakras/Indu Chakra",
    },
    {
      name: "Personalities", id: "2",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Melakarta.katapayadi.sankhya.72_correction_for_no_41-47-53-59-65-71_da2-instead-of-da3.png/330px-Melakarta.katapayadi.sankhya.72_correction_for_no_41-47-53-59-65-71_da2-instead-of-da3.png",
      title: "Personalities", subtitle: "Composers | Singer | Lyricists",
      redirect: "/persons",
    },
    {
      name: "Personalities", id: "3",
      thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Melakarta.katapayadi.sankhya.72_correction_for_no_41-47-53-59-65-71_da2-instead-of-da3.png/330px-Melakarta.katapayadi.sankhya.72_correction_for_no_41-47-53-59-65-71_da2-instead-of-da3.png",
      title: "Movies", subtitle: "Composers | Singer | Lyricists",
      redirect: "/movies",
    },
  ]
  return (
    <ClientWrap minimiseHeader={false}>
      <main>
        {/* <p className="p-4 text-gray-400">{message}</p> */}
        <section className="flex flex-col items-center gap-2 mt-2 p-4 text-gray-400">
          {/* <div className="grid gap-4 grid-cols-[repeat(auto-fit,minmax(180px,1fr))]"> */}
          <div className="grid gap-4 grid-cols-1 sm:grid-cols-3 md:grid-cols-4">
            {items.map((item) => (
              <Link
                key={item.id}
                href={item.redirect}
                className=" sm:max-w-100 md:max-w-70 border-b-4 border-b-my-secondary/50 hover:border-b-my-secondary/80   bg-white  hover:shadow-md transition p-4 block"
              >
                <div className="aspect-video bg-gray-200">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-3">
                  <h3 className="text-lg  tracking-wider text-my-accent line-clamp-2">
                    {item.title}
                  </h3>
                  <p className="text-xs text-gray-500">{item.subtitle}</p>
                </div>
              </Link>))}
          </div>

          <span>Click </span>
          <span><ArrowsPointingOutIcon className="h-5 w-5" /></span>
          <span> to expand the header</span>
        </section>
      </main>
    </ClientWrap>
  );
}
