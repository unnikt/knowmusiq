// /app/BrowseVideos/page.tsx
import BackButton from "@/components/BackButton";
import BrowseVideosClient from "./SearchVideosClient";
import SearchVideosClient from "./SearchVideosClient";

export default function SearchVideosPage() {
    return (
        <div className="section-mid">
            <BackButton />
            <SearchVideosClient />
        </div>
    );
}