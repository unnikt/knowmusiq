import { SquaresPlusIcon } from "@heroicons/react/20/solid";
import Link from "next/link";

interface ButtonTagProps {
    videoId: string;
}
export default function ButtonTag({ videoId }: ButtonTagProps) {
    return (
        <Link href={`/videos/tag?v=${videoId}`} className="p-2  text-(--primary) btn-material-icon material-symbols-outlined">
            video_settings
        </Link>

    )
}