import FilterButton from "../FilterButton";

export default function SearchHeader({ query, loading, onChangeSort }) {
    if (!query || loading) return null;

    return (
        <div className="mb-6 sm:mb-8 flex justify-between">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight wrap-break-word">
                Search results for:
                <span className="text-purple-400 ml-2">"{query}"</span>
            </h1>
            <FilterButton field="sort" onChangeSort={onChangeSort} />
        </div>
    );
}