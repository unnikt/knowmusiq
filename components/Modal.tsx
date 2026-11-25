import React from "react";

interface ModalProps {
    title?: string;
    isOpen?: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
    w?: string;
    h?: string;
}

const Modal: React.FC<ModalProps> = ({ title, isOpen, onClose, children, w, h }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50  flex items-center justify-center">
            <div
                className={`w-[${w ? w : "80vw"}] h-[${h ? h : "90vh"}] 
                bg-(--surface) rounded-md 
                max-h-[90vh] overflow-y-auto max-w-[90vw] 
                shadow-lg shadow-gray-500`}
            >
                {/* Close Button */}
                <div className="flex justify-between align-middle bg-(--accent) p-1">
                    <span className="text-white  p-2">{title}</span>
                    <button
                        onClick={onClose}
                        className="material-symbols-outlined text-white!"
                    >
                        close
                    </button>
                </div>
                {children}
            </div>
        </div >
    );
};

export default Modal;
