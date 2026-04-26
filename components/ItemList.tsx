"use client";
import { useEffect, useState } from "react";

interface ItemListProps {
    title?: string;
    items: { label: string; href?: string }[];
    pageSize?: number; // for pagination, if needed in the future
    className?: string;
    showIndex?: boolean; // whether to show index numbers before items
}
export default function ItemList({ title, items, pageSize, className, showIndex = false }: ItemListProps) {
    pageSize = pageSize || items.length; // default to all items if pageSize is not provided
    const totalPages = Math.ceil(items.length / pageSize);
    const [paginatedItems, setPaginatedItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setPaginatedItems(items.slice(0, pageSize));
    }, [items, pageSize]);


    function handlePageChange(page: number) {
        setCurrentPage(page);
        // Logic to fetch new items based on page can be added here if needed
        setPaginatedItems(items.slice((page - 1) * pageSize, page * pageSize));
    }

    return (
        <div className={`${className || "p-4 bg-(--surface) rounded-md"}`}>
            {title && (
                <h3 className="text-lg font-semibold mb-3">
                    {title}
                </h3>
            )}

            <div className="flex">
                {totalPages > 1 && (
                    <div className="flex space-x-2 border-b mb-4 py-2 w-full">
                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i + 1}
                                onClick={() => handlePageChange(i + 1)}
                                className={`px-3 py-1 rounded-md ${currentPage === i + 1
                                    ? "bg-(--primary) text-white"
                                    : "bg-(--surface)  hover:bg-(--muted)"
                                    }`}
                            >
                                {i + 1}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <ul key={currentPage} className="space-y-2 min-h-80 max-h-120 overflow-y-auto">
                {paginatedItems && paginatedItems.map((item, idx) => (
                    <li
                        key={idx}
                        className=" flex items-center justify-between"
                    >
                        {item.href ? (
                            <a
                                href={item.href}
                                className="text-(--primary) hover:text-my-hilite "
                            >
                                {showIndex && `${pageSize * (currentPage - 1) + idx + 1}. `}
                                {item.label}
                            </a>
                        ) : (
                            <span>{item.label}</span>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
