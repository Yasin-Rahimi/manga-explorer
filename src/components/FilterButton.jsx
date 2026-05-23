import { useState } from "react";
import { FaSort, FaStar, FaFont, FaChevronDown } from "react-icons/fa";

export default function FilterButton({ field, onChangeSort }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState("Sort by");

    const options = {
        sort: [
            { value: "az", label: "Alphabet", icon: <FaFont className="w-3 h-3" /> },
            { value: "rate", label: "Top Rated", icon: <FaStar className="w-3 h-3 text-yellow-400" /> }
        ]
    };

    const currentOptions = options[field] || [];

    const handleSelect = (value, label) => {
        setSelectedLabel(label);
        setIsOpen(false);
        onChangeSort(value);
    };

    return (
        <div className="relative inline-block">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="
                    flex items-center gap-2
                    px-4 py-2
                    bg-gray-900/80 backdrop-blur-sm
                    border border-gray-700
                    rounded-xl
                    text-sm font-medium text-white
                    hover:border-purple-400
                    hover:bg-gray-800
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-purple-500/50
                    cursor-pointer
                "
            >
                <FaSort className="w-4 h-4 text-purple-400" />
                <span>{selectedLabel}</span>
            </button>

            {isOpen && (
                <>
                    <div
                        className="fixed inset-0 z-10"
                        onClick={() => setIsOpen(false)}
                    />
                    <div
                        className="
                            absolute right-0 mt-2
                            w-44
                            bg-gray-900/95 backdrop-blur-md
                            border border-gray-700
                            rounded-xl
                            shadow-xl shadow-black/50
                            z-20
                            overflow-hidden
                            animate-in fade-in slide-in-from-top-2 duration-200
                        "
                    >
                        {currentOptions.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() => handleSelect(opt.value, opt.label)}
                                className="
                                    flex items-center gap-3
                                    w-full px-4 py-2.5
                                    text-sm text-gray-200
                                    hover:bg-purple-600/40
                                    hover:text-white
                                    transition-colors duration-150
                                    first:pt-2.5 last:pb-2.5 cursor-pointer
                                "
                            >
                                {opt.icon}
                                {opt.label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}