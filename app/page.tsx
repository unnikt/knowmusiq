// app/page.tsx

import HomePage from "@/app/client/Home";
import AddVideo from "@/components/AddVideo";
import ClientWrap from "@/components/ClientWrap";
import { knowmusiqAdminDB } from "@/lib/server/knowmusiqAdmin";
import Link from "next/link";


export default async function Home() {
  const message = process.env["MESSAGE"] || "Scroll ends here...";
  // const [minHeader, setMinimiseHeader] = useState(false);
  const items = [
    {
      name: "Chakra", id: "2",
      thumbnail: "./img/Chakras.png",
      title: "Chakras", subtitle: "Subtitle",
      redirect: "/chakras/Indu Chakra",
      text: "In Carnatic music, Chakras are twelve foundational groups that organize the 72 Melakarta ragas. Each chakra contains six ragas sharing similar scale patterns. The chakra names—Indu, Netra, Agni, Veda, Bana, Rutu, Rishi, Vasu, Brahma, Disi, Rudra, and Aditya—symbolize spiritual and aesthetic concepts within Indian music theory."
    },
    {
      name: "Legends", id: "3",
      thumbnail: "./img/legends.png",
      title: "Legends", subtitle: "Composers | Singer | Lyricists",
      redirect: "/persons/legends",
      text: "Explore the lives and contributions of legendary figures in Indian music, including composers, singers, and lyricists. Learn about their musical journeys, compositions, and the impact they have had on the evolution of this classical art form."

    },
    // {
    //   name: "Personalities", id: "4",
    //   thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Melakarta.katapayadi.sankhya.72_correction_for_no_41-47-53-59-65-71_da2-instead-of-da3.png/330px-Melakarta.katapayadi.sankhya.72_correction_for_no_41-47-53-59-65-71_da2-instead-of-da3.png",
    //   title: "Movies", subtitle: "Composers | Singer | Lyricists",
    //   redirect: "/movies",
    // },
  ]

  const snapshot = await knowmusiqAdminDB.collection("videos").limit(20).get();

  const videos = snapshot.docs.map((doc) => ({ id: doc.id, videoId: doc.data().videoId, ...doc.data() }));


  return (
    <ClientWrap noReturn={true}>
      <HomePage videos={videos}></HomePage>
      <h2 className="subtitle ">Topics</h2>
      <div className="grid gap-1 grid-cols-1 sm:grid-cols-3">
        {items.map((item) => (
          <Link
            key={item.id}
            href={item.redirect}
            className="sm:max-w-100 rounded mt-2 border-t-4 bg-(--surface)  border-t-my-secondary hover:border-t-my-accent/80  hover:shadow-md transition block"
          >
            <div className="p-3 w-fit">
              <h3 className="text-lg text-(--primary) tracking-wider line-clamp-2">
                {item.title}
              </h3>
              <p>{item.text}</p>
            </div>

            {/* <div className="aspect-video">
              <img
                src={item.thumbnail}
                alt={item.title}
                className=" object-cover bg-white rounded-lg"
              />
            </div> */}
          </Link>))}
      </div>
    </ClientWrap>
  );
}
