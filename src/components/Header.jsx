import { Link, useLocation } from "react-router";
import BackButton from "./BackButton";

export default function Header({
    query,
    setQuery,
    handleSearch,
}) {
    const location = useLocation();

    const isHome = location.pathname === "/"

    return (
        <header className="
            flex items-center justify-between
            px-10 py-6
            border-b border-white/10
            backdrop-blur-md
        ">
            {/* Logo */}
            <Link to="/" className="text-2xl font-bold text-white">
                Manga Explorer
            </Link>

            {/* فقط در Home نمایش داده شود */}
            {isHome ? (
                <form
                    onSubmit={handleSearch}
                    className="flex gap-2"
                >
                    <input
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        placeholder="Search for manga..."
                        className="
                            px-4 py-2
                            rounded-lg
                            text-black
                            w-80
                            bg-amber-50
                            focus:outline-none
                            focus:ring-2
                            focus:ring-purple-600
                            transition
                        "
                    />

                    <button className="
                        bg-purple-600
                        px-4 py-2
                        rounded-lg
                        cursor-pointer
                        hover:bg-purple-500
                        transition
                    ">
                        Search
                    </button>
                </form> 
            )
            : 
            <BackButton />
        }
        </header>
    );
}