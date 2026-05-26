import { ReactNode } from "react";

interface Props {
    children?: React.ReactNode;
    justify?: string;
    className?: string;
}
export default function IconsTray({ children, justify, className }: Props) {

    return (
        <div className={`w-full flex justify-${justify} align-middle mb-2 gap-4 ${className}`}>
            {children}
        </div>
    )
}