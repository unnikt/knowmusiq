// app/videos/page.tsx
import ClientWrap from "@/components/ClientWrap";
import BackButton from "@/components/BackButton";
import { knowmusiqAdminDB } from "@/lib/server/knowmusiqAdmin";
import TagNewPage from "@/components/client/TagNewPage";

export default async function Page() {
    const snapshot = await knowmusiqAdminDB.collection("videos").limit(20).get();

    return (
        <ClientWrap >
            <div className="section-mid">
                <BackButton />
                <TagNewPage />
            </div>
        </ClientWrap>
    );
}