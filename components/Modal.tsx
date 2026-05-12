import React from "react";

interface ModalProps {
    isOpen?: boolean;
    onClose?: () => void;
    children?: React.ReactNode;
    width?: string;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children, width }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50  bg-black/50 flex items-center justify-center">
            <div className={`w-[${width ? width : 80}vw] bg-(--surface) max-h-[90vh] overflow-y-auto max-w-200 
            rounded-md shadow-lg relative animate-[fadeIn_0.2s_ease-out]`}>
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-2 right-6  hover:text-gray-700 text-4xl"
                >
                    &times;
                </button>

                {children}
            </div>
        </div >
    );
};

export default Modal;
