import { XMarkIcon } from "@heroicons/react/20/solid";
import { useState } from "react";

interface MessageProps {
    message: string;
    type?: "info" | "error" | "success";
    popup?: boolean;
}

export default function Message({ message, popup }: MessageProps) {
    const [visible, setVisible] = useState(true);
    const type = message.split(":")[0].toLowerCase() || "info";
    const textColor = type === "error" ? "text-red-500" : type === "success" ? "text-green-500" : "text-blue-500";
    return (
        visible && (
            <div className={`${popup ? "absolute top-1/2 left-1/2 transform -translate-x-1/2 shadow-lg " : ""} p-4  bg-slate-50 z-50 rounded`}>
                {popup && <XMarkIcon className="m-2 h-5 w-5 absolute top-1 right-1 cursor-pointer" onClick={() => setVisible(false)} />}
                <p className={` ${textColor}  px-4 py-2  `}>{message.split(":")[1] || message}</p>
            </div>
        )
    );
}