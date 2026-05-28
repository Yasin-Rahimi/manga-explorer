// src/components/common/Header/SidebarMenu.jsx
import { useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import SidebarHeader from "./SidebarHeader";
import SearchModeSelector from "./SearchModeSelector";
import SearchForm from "./SearchForm";

export default function SidebarMenu({ isOpen, onClose, onTextMode, isTextModeActive }) {
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset";
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xl flex flex-col shadow-2xl animate-in fade-in duration-300">
            <SidebarHeader onClose={onClose} />
            <div className="flex-1 flex flex-col items-center justify-start px-4 pt-8">
                <div className="w-full max-w-md space-y-4 flex gap-2 justify-center">
                    {!isTextModeActive && (
                        <>
                            <div className="flex items-center justify-center gap-2 group cursor-default">
                                <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-300 via-pink-300 to-purple-300 font-medium text-sm tracking-wide animate-shimmer bg-size-[200%_auto]">
                                    Looking for manga?
                                </span>
                            </div>
                            <SearchModeSelector onTextMode={onTextMode} isTextModeActive={isTextModeActive} />
                        </>
                    )}
                    {isTextModeActive && (
                        <SearchForm 
                            isMobileMenu={true} 
                            onSearchComplete={onClose}
                            isTextModeActive={isTextModeActive}
                            onTextMode={onTextMode}
                        />
                    )}
                </div>
            </div>
        </div>
    );
}