import { FaUpload, FaSpinner } from 'react-icons/fa';

export default function ImageUploadControls({ onIdentify, onClear, hasImage, isLoading }) {
    return (
        <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 sm:mt-6">
            <button
                onClick={onIdentify}
                disabled={!hasImage || isLoading}
                className="cursor-pointer flex items-center justify-center gap-2 px-3 py-2 sm:px-5 sm:py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition disabled:opacity-50 text-white font-medium text-sm sm:text-base"
            >
                {isLoading ? <FaSpinner className="animate-spin" /> : <FaUpload />}
                {isLoading ? 'Identifying...' : 'Identify Manga'}
            </button>
            {hasImage && (
                <button
                    onClick={onClear}
                    className="cursor-pointer px-3 py-2 sm:px-4 sm:py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition text-white text-sm sm:text-base"
                >
                    Clear
                </button>
            )}
        </div>
    );
}