import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function MainMenu({ onClose }) {

    const links = [
        { name: "Videos", href: "/videos" },
        { name: "Personalities", href: "/persons/type/composers" },
        { name: "Legends", href: "/persons/legends" },
        { name: "Chakras", href: "/chakras/Indu chakra" },
    ];

    return (
        open && (
            <div className="bg-slate-600 mt-1 px-4 py-2 absolute shadow min-w-40 rounded-sm z-50">
                <div className="flex flex-col gap-2 pt-2">
                    {links.map(link => (
                        <Link
                            key={link.name}
                            href={link.href}
                            onClick={onClose}
                            className="py-2 text-white"
                        >
                            {link.name}
                        </Link>
                    ))}
                </div>
                <div className="border-t border-t-white text-white w-full py-2 mt-2">
                    <Link href="/user" onClick={onClose}>
                        Your Account
                    </Link>
                </div>

                <ThemeToggle />

            </div>
        )
    );
}
