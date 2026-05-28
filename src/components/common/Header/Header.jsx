// src/components/common/Header/Header.jsx
import { useState } from "react";
import { useLocation } from "react-router";
import { FaSearch } from "react-icons/fa";
import Logo from "./Logo";
import MobileMenuButton from "./MobileMenuButton";
import SidebarMenu from "./SidebarMenu";
import BackButton from "../BackButton";
import SearchModeSelector from "./SearchModeSelector";
import SearchForm from "./SearchForm";

export default function Header() {
    const location = useLocation();
    const isHome = location.pathname === "/";
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isTextModeActive, setIsTextModeActive] = useState(false);

    const handleTextMode = () => {
        setIsTextModeActive(true);
    };

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/30 backdrop-blur-xl shadow-lg shadow-black/20">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-5 px-2 sm:px-6 md:px-8 py-2 sm:py-4">
                    <Logo />
                    <div className="hidden sm:flex items-center gap-3">
                        {isHome ? (
                            isTextModeActive ? (
                                <SearchForm 
                                    isTextModeActive={isTextModeActive} 
                                    onTextMode={handleTextMode}
                                    isMobileMenu={false}
                                />
                            ) : (
                                <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2 group cursor-default">
                                        <span className="text-l text-transparent bg-clip-text bg-linear-to-r from-purple-300 via-pink-300 to-purple-300 font-medium tracking-wide animate-shimmer bg-size-[200%_auto]">
                                            Looking for manga?
                                        </span>
                                    </div>
                                    <SearchModeSelector onTextMode={handleTextMode} isTextModeActive={isTextModeActive} />
                                </div>
                            )
                        ) : (
                            <BackButton />
                        )}
                    </div>
                    <div className="flex sm:hidden items-center gap-2">
                        {!isHome && <BackButton />}
                        {isHome && <MobileMenuButton onClick={() => setIsSidebarOpen(true)} />}
                    </div>
                </div>
            </header>
            {isHome && (
                <SidebarMenu
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                    onTextMode={handleTextMode}
                    isTextModeActive={isTextModeActive}
                />
            )}
        </>
    );
}