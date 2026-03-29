interface ItemListProps {
    title?: string;
    items: { label: string; href?: string }[];
}
export default function ItemList({ title, items }: ItemListProps) {
    return (
        <div className="card-new">
            {title && (
                <h3 className="text-lg font-semibold text-gray-600 mb-3">
                    {title}
                </h3>
            )}

            <ul className="space-y-2">
                {items.map((item, idx) => (
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
