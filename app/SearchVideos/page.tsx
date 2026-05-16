// /app/BrowseVideos/page.tsx
import SearchVideosClient from "./SearchVideosClient";
import ClientWrap from "@/components/ClientWrap";

export default function SearchVideosPage() {
    return (
        <ClientWrap>
            <SearchVideosClient />
        </ClientWrap>
    );
}