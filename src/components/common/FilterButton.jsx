import { useState } from "react";
import { FaSort, FaStar, FaFont } from "react-icons/fa";

export default function FilterButton({ field, onChangeSort }) {
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLabel, setSelectedLabel] = useState("Sort");

    const options = {
        sort: [
            {
                value: "az",
                label: "Alphabet",
                icon: <FaFont className="w-3 h-3" />
            },
            {
                value: "rate",
                label: "Top Rated",
                icon: <FaStar className="w-3 h-3 text-yellow-400" />
            }
        ]
    };

    const currentOptions = options[field] || [];

    const handleSelect = (value, label) => {
        setSelectedLabel(label);
        setIsOpen(false);
        onChangeSort(value);
    };

    return (
        <div className="relative inline-block w-full sm:w-auto">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="
                    w-full sm:w-auto
                    flex items-center justify-center sm:justify-start
                    gap-2
                    px-3 sm:px-4 md:px-4
                    py-2 sm:py-2.5
                    bg-gray-900/80 backdrop-blur-sm
                    border border-gray-700
                    rounded-lg sm:rounded-xl
                    text-xs sm:text-sm md:text-sm font-medium text-white
                    hover:border-purple-400
                    hover:bg-gray-800
                    transition-all duration-200
                    focus:outline-none focus:ring-2 focus:ring-purple-500/50
                    cursor-pointer
                    min-w-30
                "
            >
                <FaSort className="w-4 h-4 text-purple-400 shrink-0" />
                <span className="truncate">{selectedLabel}</span>
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
                            w-40 sm:w-44
                            bg-gray-900/95 backdrop-blur-md
                            border border-gray-700
                            rounded-lg sm:rounded-xl
                            shadow-xl shadow-black/50
                            z-20
                            overflow-hidden
                        "
                    >
                        {currentOptions.map((opt) => (
                            <button
                                key={opt.value}
                                onClick={() =>
                                    handleSelect(opt.value, opt.label)
                                }
                                className="
                                    flex items-center gap-2 sm:gap-3
                                    w-full px-3 sm:px-4 py-2.5
                                    text-xs sm:text-sm text-gray-200
                                    hover:bg-purple-600/40
                                    hover:text-white
                                    transition-colors duration-150
                                    cursor-pointer
                                "
                            >
                                {opt.icon}
                                <span className="truncate">{opt.label}</span>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}