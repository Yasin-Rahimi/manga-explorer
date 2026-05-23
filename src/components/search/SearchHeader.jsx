import FilterButton from "../FilterButton";
import { FaSearch } from "react-icons/fa";

export default function SearchHeader({ query, loading, onChangeSort }) {
    if (!query || loading) return null;
    return (
        <div className="mb-6 sm:mb-8 flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight wrap-break-word flex items-center gap-2">
                <FaSearch className="text-purple-400" />
                Search results for:
                <span className="text-purple-400 ml-2">"{query}"</span>
            </h1>
            <FilterButton field="sort" onChangeSort={onChangeSort} />
        </div>
    );
}