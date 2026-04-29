import { ReactNode } from "react";

interface Props {
    children?: React.ReactNode;
    justify?: string;
}
export default function IconsTray({ children, justify }: Props) {

    return (
        <div className={`w-full flex justify-${justify} align-middle mb-2 gap-2 border-t pt-2 border-slate-400`}>
            {children}
        </div>
    )
}