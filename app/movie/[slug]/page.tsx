import AddVideo from "@/components/AddVideo";
import ClientWrap from "@/components/ClientWrap";
import VideoGrid from "@/components/VideoGrid";
import Link from "next/link";

export default async function MoviePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const movie = slug.replace(/%20/g, " ");

    // async function fetchDesc() {
    //     // setLoading(true);
    //     const prompt = `Provide a summary of the movie ${movie}`;

    //     const res = await fetch("/api/summarise", {
    //         method: "POST",
    //         body: JSON.stringify({ prompt: prompt }),
    //     });

    //     const data = await res.json();
    //     console.log(data.summary);
    //     setDesc(data.summary);
    // }

    return (
        <ClientWrap >
            <div className="flex justify-between">
                <h2 className="text-xl py-2">{movie}</h2>
                <div className="flex gap-2 w-fit">
                    <AddVideo
                        name={movie}
                        tag="movi"
                    />
                    <Link
                        href={"/movie"}
                        className="btn-round-icon material-symbols-outlined h-10">
                        movie
                    </Link>
                </div>


            </div >
            <VideoGrid
                tag="movi"
                value={movie}
            />

        </ClientWrap>
    );
}