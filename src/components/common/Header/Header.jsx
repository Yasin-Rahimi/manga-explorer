import { useState } from "react";
import { useLocation, Link } from "react-router";
import { FaCamera } from "react-icons/fa";
import Logo from "./Logo";
import MobileMenuButton from "./MobileMenuButton";
import SidebarMenu from "./SidebarMenu";
import BackButton from "../BackButton";
import SearchForm from "./SearchForm";

export default function Header() {
    const location = useLocation();
    const isHome = location.pathname === "/";
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const cameraButton = (
        <Link
            to="/image-search"
            className="flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-purple-600/30 hover:bg-purple-600 transition-all duration-200 text-white shrink-0"
            title="Search by image"
        >
            <FaCamera className="w-4 h-4 sm:w-5 sm:h-5" />
        </Link>
    );

    return (
        <>
            <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/30 backdrop-blur-xl shadow-lg shadow-black/20">
                <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-5 px-2 sm:px-6 md:px-8 py-2 sm:py-4">
                    <Logo />
                    <div className="hidden md:flex items-center gap-3">
                        {isHome ? (
                            <SearchForm cameraButton={cameraButton} isMobileMenu={false} />
                        ) : (
                            <BackButton />
                        )}
                    </div>
                    <div className="flex md:hidden items-center gap-2">
                        {!isHome && <BackButton />}
                        {isHome && <MobileMenuButton onClick={() => setIsSidebarOpen(true)} />}
                    </div>
                </div>
            </header>
            {isHome && (
                <SidebarMenu
                    isOpen={isSidebarOpen}
                    onClose={() => setIsSidebarOpen(false)}
                />
            )}
        </>
    );
}