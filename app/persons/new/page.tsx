// app/videos/page.tsx
import ClientWrap from "@/components/ClientWrap";
import AddPerson from "@/app/client/AddPerson/page";

export default async function Page() {

    return (
        <ClientWrap >
            <AddPerson />
        </ClientWrap>
    );
}