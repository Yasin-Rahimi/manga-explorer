// src/components/common/Header/MobileMenuButton.jsx
import { FaBars } from "react-icons/fa";

export default function MobileMenuButton({ onClick }) {
    return (
        <button
            onClick={onClick}
            className="text-white p-2 hover:bg-white/10 rounded-full transition"
            aria-label="Open menu"
        >
            <FaBars className="w-5 h-5" />
        </button>
    );
}