// src/components/common/Header/SearchModeSelector.jsx
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { FaChevronDown, FaSearch, FaCamera } from "react-icons/fa";

export default function SearchModeSelector({ onTextMode, isTextModeActive }) {
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const options = [
        { value: "text", label: "Text Search", icon: <FaSearch className="w-3.5 h-3.5" /> },
        { value: "image", label: "Image Search", icon: <FaCamera className="w-3.5 h-3.5" /> }
    ];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (value) => {
        setIsOpen(false);
        if (value === "image") {
            navigate("/image-search");
        } else if (value === "text" && !isTextModeActive) {
            onTextMode();
        }
    };

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"  // ← جلوگیری از ارسال فرم
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer flex items-center justify-center gap-1 px-2 py-1.5 text-sm bg-purple-600/20 border border-purple-500/30 rounded-lg hover:bg-purple-600/30 transition-colors text-white"
                title="Search mode"
            >
                <FaChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />
            </button>

            {isOpen && (
                <div className="absolute justify-self-center mt-2 w-36 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg z-20 overflow-hidden">
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            type="button"  // ← جلوگیری از ارسال فرم
                            onClick={() => handleSelect(opt.value)}
                            className="cursor-pointer flex items-center gap-2 w-full px-3 py-2 text-xs text-gray-200 hover:bg-purple-600/40 hover:text-white transition-colors text-left"
                        >
                            {opt.icon}
                            {opt.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}