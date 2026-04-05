import Link from "next/link";
import { useRouter } from "next/navigation";

export default function TagVideoButton({ videoId }) {
    const router = useRouter();

    function handleClick() {
        router.push(`/tag/${videoId}`);
    }

    return (
        // <button
        //     onClick={handleClick}
        //     className="p-2 hover:bg-black/80 rounded-full transition"
        // >
        //     <span>Add tags to this video </span>
        // </button>
        <Link
            href={"/"}
            className="text-blue-600 pl-2"
        >
            Add tags to this video </Link>
    );
}