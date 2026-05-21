export default function Pagination({
    page,
    setPage,
    lastPage,
}) {
    return (
        <div className="flex justify-center items-center gap-4 mt-10">

            {/* Prev Button */}
            <button
                onClick={() => setPage((p) => Math.max(p - 1, 1))}
                disabled={page === 1}
                className="
                    px-4 py-2
                    bg-purple-700
                    rounded-lg
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    hover:bg-purple-600
                    transition
                    cursor-pointer
                "
            >
                Prev
            </button>

            {/* Page Info */}
            <span className="text-gray-300">
                Page {page} / {lastPage}
            </span>

            {/* Next Button */}
            <button
                onClick={() => setPage((p) => Math.min(p + 1, lastPage))}
                disabled={page === lastPage}
                className="
                    px-4 py-2
                    bg-purple-700
                    rounded-lg
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    hover:bg-purple-600
                    transition
                    cursor-pointer
                "
            >
                Next
            </button>

        </div>
    );
}