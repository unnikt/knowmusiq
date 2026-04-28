import { SquaresPlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

interface ButtonTagProps {
    videoId: string;
}
export default function ButtonTag({ videoId }: ButtonTagProps) {
    return (
        <Link href={`/videos/tag?v=${videoId}`} className="p-2">
            <SquaresPlusIcon className="w-5 h-5 text-(--primary)" />
        </Link>

    )
}