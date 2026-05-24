import MangaCard from "../../../components/common/MangaCard";

export default function SearchResultsGrid({ results, sortResult }) {
    const displayList = sortResult.length === 0 ? results : sortResult;

    if (displayList.length === 0) return null;

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5 md:gap-6">
            {displayList.map((manga, index) => (
                <MangaCard key={index} manga={manga} />
            ))}
        </div>
    );
}