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
                bg-(--surface2) rounded-md 
                border-2 border-(--border) 
                max-h-[90vh] overflow-y-auto max-w-[90vw] 
                shadow-lg relative animate-[fadeIn_0.2s_ease-out]`}
            >
                {/* Close Button */}
                <div className="flex justify-between align-middle bg-(--surface) p-2">
                    <h2 className="text-xl p-2">{title}</h2>
                    <button
                        onClick={onClose}
                        className="material-symbols-outlined"
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
