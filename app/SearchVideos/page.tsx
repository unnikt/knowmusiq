// /app/BrowseVideos/page.tsx
import SearchVideosClient from "./SearchVideosClient";
import ClientWrap from "@/components/ClientWrap";
import TopBar from "@/components/TopBar";

export default function SearchVideosPage() {
    return (
        <ClientWrap>
            <TopBar />
            <SearchVideosClient />
        </ClientWrap>
    );
}