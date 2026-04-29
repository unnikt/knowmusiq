import ClientWrap from "@/components/ClientWrap";
import TopBar from "@/components/TopBar";

export default function NotFound() {
  return (
    <ClientWrap>
      <div className="relative w-full">
        <TopBar />
      </div>
      <h1 className="relative heading mx-auto mt-10">Page not found</h1>
    </ClientWrap>
  );
}
