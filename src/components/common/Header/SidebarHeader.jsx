// src/components/common/Header/SidebarHeader.jsx
import { FaTimes } from "react-icons/fa";

export default function SidebarHeader({ onClose }) {
    return (
        <div className="flex justify-end p-4">
            <button
                onClick={onClose}
                className="text-white p-2 hover:bg-white/10 rounded-full transition"
                aria-label="Close menu"
            >
                <FaTimes className="w-6 h-6" />
            </button>
        </div>
    );
}