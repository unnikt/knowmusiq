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
        <div className="p-2 gap-1 flex flex-wrap bg-my-lite rounded-t-lg   shadow-sm">
            {pages.map((p) => (
                <button
                    key={p}
                    onClick={() => onPageChange(p)}
                    className={`mb-1 px-3 py-1 text-white  rounded  min-w-10 transition 
                        ${p === currentPage
                            ? " bg-my-secondary font-semibold"
                            : "hover:bg-gray-100 border-gray-300"
                        }`}
                >
                    {p}
                </button>
            ))}
        </div>
    );
}
