import BackButton from "./BackButton";

interface TopBarProps {
    children?: React.ReactNode;
    ret?: string | null;
}
export default function TopBar({ children, ret }: TopBarProps) {
    return (
        <div className="topbar">
            <BackButton url={ret} />
            {children}
        </div>
    );
}