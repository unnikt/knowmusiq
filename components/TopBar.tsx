import BackButton from "./BackButton";

export default function TopBar({ children }: { children: React.ReactNode }) {
    return (
        <div className="topbar">
            <BackButton />
            {children}
        </div>
    );
}