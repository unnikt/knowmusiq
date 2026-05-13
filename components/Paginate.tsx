"use client";

interface Paginate {
    pages: string[];               // ["A", "B", "C"] or ["Songs", "Krithis"]
    currentPage: string;           // the active page name
    onPageChange: (page: string) => void;
}

export default function Paginate({
    pages,
    currentPage,
    onPageChange,
}: Paginate) {
    if (!pages || pages.length <= 1) return null;

    return (
        <div className="py-2 gap-1  rounded-t flex flex-wrap">
            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    className={`p-2 text-(--primary) min-w-10 transition tracking-wide
                        ${p === currentPage
                            ? "border-b-my-secondary  border-b-2  bg-(--surface) rounded-t font-semibold"
                            : "hover:bg-gray-100 hover:text-my-secondary bg-(--surface)/60 rounded-t"
                        }`}
                >
                    {p}
                </button>
            ))}
        </div>
    );
}
