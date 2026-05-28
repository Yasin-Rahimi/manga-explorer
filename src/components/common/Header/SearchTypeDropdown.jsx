// src/components/common/Header/SearchTypeDropdown.jsx
import { useState, useRef, useEffect } from "react";
import { FaChevronDown, FaSearch, FaRobot, FaSpinner } from "react-icons/fa";

export default function SearchTypeDropdown({ selectedType, onSelectType, onSearch, isLoading }) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);

    const options = [
        { value: "normal", label: "Normal Search", icon: <FaSearch className="w-3.5 h-3.5" /> },
        { value: "ai", label: "AI Search", icon: <FaRobot className="w-3.5 h-3.5" /> }
    ];

    const currentOption = options.find(opt => opt.value === selectedType) || options[0];

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const handleSelect = (option) => {
        setIsOpen(false);
        onSelectType(option.value);
        onSearch(option.value);
    };

    // نمایش حالت بارگذاری
    const buttonContent = isLoading ? (
        <>
            <FaSpinner className="w-3.5 h-3.5 animate-spin" />
            <span>Searching...</span>
        </>
    ) : (
        <>
            {currentOption.icon}
            <span>{currentOption.label}</span>
        </>
    );

    return (
        <div className="relative" ref={dropdownRef}>
            <button
                type="button"
                onClick={() => !isLoading && setIsOpen(!isOpen)}
                disabled={isLoading}
                className="flex items-center gap-2 px-4 py-2 rounded-xl bg-linear-to-r from-purple-600 to-indigo-600 text-white text-sm font-medium cursor-pointer hover:from-purple-500 hover:to-indigo-500 transition shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {buttonContent}
                {!isLoading && <FaChevronDown className={`w-3 h-3 transition-transform ${isOpen ? "rotate-180" : ""}`} />}
            </button>
            {isOpen && !isLoading && (
                <div className="absolute right-0 mt-2 w-44 bg-gray-900/95 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg z-20 overflow-hidden">
                    {options.map((opt) => (
                        <button
                            key={opt.value}
                            type="button"
                            onClick={() => handleSelect(opt)}
                            className="flex items-center gap-2 w-full px-3 py-2 text-sm text-gray-200 hover:bg-purple-600/40 hover:text-white transition-colors text-left"
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