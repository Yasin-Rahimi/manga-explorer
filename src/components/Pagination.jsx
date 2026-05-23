export default function Pagination({
    page,
    setPage,
    lastPage
}) {
    return (
        <div className="mt-8 sm:mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full px-4">
            <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="cursor-pointer w-full sm:w-auto px-4 py-2 bg-purple-700 rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Prev
            </button>

            <span className="text-sm sm:text-base text-gray-300">
                Page {page} / {lastPage}
            </span>

            <button
                onClick={() => setPage((p) => Math.min(p + 1, lastPage))}
                disabled={page === lastPage}
                className="cursor-pointer w-full sm:w-auto px-4 py-2 bg-purple-700 rounded-lg hover:bg-purple-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                Next
            </button>
        </div>
    );
}