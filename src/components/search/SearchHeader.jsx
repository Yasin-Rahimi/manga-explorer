import FilterButton from "../FilterButton";
import { FaSearch } from "react-icons/fa";

export default function SearchHeader({ query, loading, onChangeSort }) {
    if (!query || loading) return null;

    return (
        <div className="
            mb-6 sm:mb-8
            flex flex-col sm:flex-row
            sm:items-center sm:justify-between
            gap-4 sm:gap-0
            w-full
        ">
            <h1 className="
                flex items-start sm:items-center
                gap-2
                text-base xs:text-lg sm:text-xl md:text-2xl lg:text-3xl
                font-bold tracking-tight
                break-words
                w-full sm:w-auto
                leading-snug sm:leading-tight
            ">
                <FaSearch className="text-purple-400 shrink-0 mt-1 sm:mt-0" />

                <span className="flex flex-wrap items-center gap-1">
                    Search results for:
                    <span className="text-purple-400 break-all">
                        "{query}"
                    </span>
                </span>
            </h1>

            <div className="
                w-full sm:w-auto
                flex sm:justify-end
            ">
                <FilterButton field="sort" onChangeSort={onChangeSort} />
            </div>
        </div>
    );
}