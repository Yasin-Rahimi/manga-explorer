import { useLocation } from "react-router";
import Logo from "./Logo";
import SearchForm from "./SearchForm";
import BackButton from "../BackButton";

export default function Header() {
    const location = useLocation();
    const isHome = location.pathname === "/";

    return (
        <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-black/30 backdrop-blur-xl shadow-lg shadow-black/20">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-5 px-4 sm:px-6 md:px-8 py-3 sm:py-4">
                <Logo />
                {isHome ? <SearchForm /> : <BackButton />}
            </div>
        </header>
    );
}