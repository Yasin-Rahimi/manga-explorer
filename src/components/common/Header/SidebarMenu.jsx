// src/components/common/Header/SidebarMenu.jsx
import { useEffect } from "react";
import { Link } from "react-router";
import { FaCamera } from "react-icons/fa";
import SearchForm from "./SearchForm";
import SidebarHeader from "./SidebarHeader";

export default function SidebarMenu({ isOpen, onClose }) {
    useEffect(() => {
        document.body.style.overflow = isOpen ? "hidden" : "unset";
        return () => { document.body.style.overflow = "unset"; };
    }, [isOpen]);

    if (!isOpen) return null;

    const cameraButton = (
        <Link
            to="/image-search"
            onClick={onClose}
            className="relative flex items-center justify-center w-9 h-9 rounded-full bg-purple-600/40 hover:bg-purple-600 transition-all duration-200 text-white shrink-0 group"
            title="Search by image (AI powered)"
        >
            <FaCamera className="w-4 h-4" />
        </Link>
    );

    return (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xl flex flex-col shadow-2xl animate-in fade-in duration-300">
            <SidebarHeader onClose={onClose} />
            <div className="flex-1 flex flex-col items-center justify-start px-4">
                <div className="w-full max-w-md">
                    <SearchForm
                        isMobileMenu={true}
                        onSearchComplete={onClose}
                        extraButton={cameraButton}
                    />
                </div>
            </div>
        </div>
    );
}