// app/videos/page.tsx
import ClientWrap from "@/components/ClientWrap";
import AddPerson from "@/app/client/AddPerson/page";
import TopBar from "@/components/TopBar";

export default async function Page() {

    return (
        <ClientWrap >
            <TopBar />
            <AddPerson />
        </ClientWrap>
    );
}