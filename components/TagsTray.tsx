import { Tags } from "@/lib/const/Tags";
import { deSlug } from "@/lib/string/deSlugify";
import Link from "next/link";

interface TagsTrayProps {
    video: any;
    skipTags?: string[];
    className?: string;
}

export default function TagsTray({ video, skipTags, className }: TagsTrayProps) {
    return (
        <div className={`flex-list ${className}`}>
            {video && Tags.map(tag =>
                video[tag.key] && !skipTags?.includes(tag.key) &&
                <Link
                    key={tag.key}
                    href={`${tag.base}/${video[tag.key]}`}
                    className="flex items-center gap-1 hover:text-my-hilite">
                    <span className="material-symbols-outlined">{tag.icon || "label"}</span>
                    {deSlug(video[tag.key])}
                </Link>
            )}
        </div>
    );
}