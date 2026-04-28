import ClientWrap from "@/components/ClientWrap";
import AddButton from "@/components/AddButton";
import TopBar from "@/components/TopBar";
import YouTubePlayer from "@/components/YTPlayer";
import { knowmusiqAdminDB } from "@/lib/server/knowmusiqAdmin";
import ItemList from "@/components/ItemList";
import { slugify } from "@/lib/string/slugify";
import ButtonTag from "@/components/TagVideoButton";
import ShareButton from "@/components/ShareButton";

export default async function VideoPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const snaps = await knowmusiqAdminDB.collection("videos").doc(slug).get();

    if (!snaps.exists)
        return (
            <ClientWrap>
                <TopBar>
                    <AddButton text="Person" href="/client/AddPerson" />
                </TopBar>
                <div className="card">
                    <p>Video not found!</p>
                </div>
            </ClientWrap>
        )

    const video = { id: snaps.id, ...snaps.data() };

    const fields = [
        { key: "comp", label: "Composer", base: "/persons/" },
        { key: "lyri", label: "Lyricist", base: "/persons/" },
        { key: "sing", label: "Singer", base: "/persons/" },
        { key: "movi", label: "Movie", base: "/movie/" },
        { key: "lang", label: "Language", base: "/language/" },
        { key: "raga", label: "Raga", base: "/raga/" },
        { key: "tala", label: "Tala", base: "/tala/" },
    ];

    const tags = fields
        .map(({ key, label, base }) => {
            const value = video[key];
            return {
                label: `${value || ""}`,
                href: value ? `${base}${slugify(value)}` : null,
                isEmpty: !value,
            };
        })
        .filter(tag => !tag.isEmpty);

    return (
        <ClientWrap >
            <TopBar>
                <AddButton text="Person" href="/client/AddPerson" />
            </TopBar>
            <div className="card">
                <YouTubePlayer videoId={slug} autoplay={false} key={slug} />
                <p className="title truncate">{video["title"]}</p>
                <ItemList items={tags} className="px-0 py-3 border-b mt-2" />
                <div className="flex">
                    <ShareButton text={video["title"]} url={`/videos/${video.id}`} title={video["title"]} />
                    <ButtonTag videoId={video.id} />
                </div>
            </div>
        </ClientWrap>
    );
}
