// app/videos/page.tsx
import ClientWrap from "@/components/ClientWrap";
import BackButton from "@/components/BackButton";
import AddPerson from "@/app/client/AddPerson/page";

export default async function Page() {

    return (
        <ClientWrap >
            <div className="section-mid">
                <BackButton />
                <AddPerson />
            </div>
        </ClientWrap>
    );
}