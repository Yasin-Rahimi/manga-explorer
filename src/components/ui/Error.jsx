export default function Error({ message, onRetry }) {
    return (
        <div className="w-full flex flex-col items-center justify-center py-10 text-center">
            <p className="text-red-400 mb-3 text-2xl">
                {message}
            </p>

            {onRetry && (
                <button
                    onClick={onRetry}
                    className="px-4 py-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition cursor-pointer"
                >
                    Retry
                </button>
            )}
        </div>
    );
}