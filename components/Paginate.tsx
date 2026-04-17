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
        <div className="p-2 gap-1 bg-(--surface) rounded-t flex flex-wrap border-b-3 border-b-my-secondary/70  border-sky-300 shadow-sm">
            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    className={`mb-1 px-3 py-1 text-my-secondary/80  rounded  min-w-10 transition 
                        ${p === currentPage
                            ? "bg-my-secondary text-white font-semibold  "
                            : "hover:bg-gray-100 hover:text-my-secondary"
                        }`}
                >
                    {p}
                </button>
            ))}
        </div>
    );
}
