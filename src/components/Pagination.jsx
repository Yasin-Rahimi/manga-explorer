export default function Pagination({
    page,
    setPage,
    lastPage,
    setSort
}) {
    return (
        <div
            className="
                mt-8 sm:mt-10
                flex flex-col sm:flex-row
                items-center justify-center
                gap-3 sm:gap-4
                w-full
                px-4
            "
        >

            {/* Prev Button */}
            <button
                onClick={() => {
                    setPage((p) => Math.max(p - 1, 1))
                    setSort('')
                }}
                disabled={page === 1}
                className="
                    w-full sm:w-auto
                    min-w-25
                    px-4 sm:px-5
                    py-2.5
                    text-sm sm:text-base
                    font-medium
                    bg-purple-700
                    rounded-lg sm:rounded-xl
                    transition
                    cursor-pointer
                    hover:bg-purple-600
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    whitespace-nowrap
                "
            >
                Prev
            </button>

            {/* Page Info */}
            <span
                className="
                    text-sm sm:text-base
                    text-center
                    text-gray-300
                    whitespace-nowrap
                "
            >
                Page {page} / {lastPage}
            </span>

            {/* Next Button */}
            <button
                onClick={() => {
                    setPage((p) => Math.min(p + 1, lastPage))
                    setSort('')
                }}
                disabled={page === lastPage}
                className="
                    w-full sm:w-auto
                    min-w-25
                    px-4 sm:px-5
                    py-2.5
                    text-sm sm:text-base
                    font-medium
                    bg-purple-700
                    rounded-lg sm:rounded-xl
                    transition
                    cursor-pointer
                    hover:bg-purple-600
                    disabled:opacity-50
                    disabled:cursor-not-allowed
                    whitespace-nowrap
                "
            >
                Next
            </button>

        </div>
    );
}