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
    const effectivePageSize = pageSize || items.length; // default to all items if pageSize is not provided
    const totalPages = Math.ceil(items.length / effectivePageSize);
    const [paginatedItems, setPaginatedItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        setPaginatedItems(items.slice(0, effectivePageSize));
    }, [items, effectivePageSize]);


    function handlePageChange(page: number) {
        setCurrentPage(page);
        // Logic to fetch new items based on page can be added here if needed
        setPaginatedItems(items.slice((page - 1) * effectivePageSize, page * effectivePageSize));
    }

    return (
        <div className={`${className || "card"}`}>
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

            <ul key={currentPage} className="space-y-2 overflow-y-auto">
                {paginatedItems && paginatedItems.map((item, idx) => (
                    <li
                        key={idx}
                        className=" flex items-center justify-between pl-2"
                    >
                        {item.href ? (
                            <a
                                href={item.href}
                                className="flex gap-2 text-(--primary) hover:text-my-hilite w-full "
                            >
                                <span>{showIndex && `${effectivePageSize * (currentPage - 1) + idx + 1}. `}</span>
                                <span className="truncate ">{item.label}</span>
                            </a>
                        ) : (
                            <div className="flex gap-2  w-full">
                                <span>{showIndex && `${effectivePageSize * (currentPage - 1) + idx + 1}. `}</span>
                                <span className="truncate ">{item.label}</span>
                            </div>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
}
