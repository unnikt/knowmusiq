"use client";

import { useEffect } from "react";
import { useApp } from "@/context/AppContext";

type ClientWrapProps = {
    children: React.ReactNode;
    minimiseHeader?: boolean;
    restoreOnLeave?: boolean;
};
export default function ClientWrap({
    children,
    minimiseHeader = false,
    restoreOnLeave = true,
}: ClientWrapProps) {
    const { setMinimiseHeader } = useApp();

    useEffect(() => {
        console.log("ClientPage mounted, minimiseHeader =", minimiseHeader);

        // Apply header state on mount
        setMinimiseHeader(minimiseHeader);

        // Restore when leaving page
        return () => {
            if (restoreOnLeave) setMinimiseHeader(false);
        };
    }, [minimiseHeader, restoreOnLeave, setMinimiseHeader]);

    return <>{children}</>;
}