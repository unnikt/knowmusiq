interface ItemListProps {
    title?: string;
    items: { label: string; href?: string }[];
    className?: string;
}
export default function ItemList({ title, items, className }: ItemListProps) {
    return (
        <div className={`card-new ${className || ""}`}>
            {title && (
                <h3 className="text-lg font-semibold text-gray-600 mb-3">
                    {title}
                </h3>
            )}

            <ul className="space-y-2">
                {items && items.map((item, idx) => (
                    <li
                        key={idx}
                        className=" flex items-center justify-between"
                    >
                        {item.href ? (
                            <a
                                href={item.href}
                                className="text-my-accent hover:text-my-hilite "
                            >
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
