import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';

interface TodoModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const TodoModal: React.FC<TodoModalProps> = ({ isOpen, onClose, children }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    if (!isOpen || !mounted) return null;

    const modalRoot = document.getElementById('modal-root');

    if (!modalRoot) return null;
    return ReactDOM.createPortal(
        <div className="fixed inset-0 bg-gray-600 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-4 w-full max-w-md relative">
                <button
                    className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700"
                    onClick={onClose}
                >
                    &times;
                </button>
                {children}
            </div>
        </div>,
        modalRoot
    );
};

export default TodoModal;
