// src/pages/ImageSearch/components/ImageUploadControls.jsx
import { FaUpload, FaSpinner } from 'react-icons/fa';

export default function ImageUploadControls({ onIdentify, onClear, hasImage, isLoading }) {
    return (
        <div className="flex gap-3 mt-6">
            <button
                onClick={onIdentify}
                disabled={!hasImage || isLoading}
                className="cursor-pointer flex items-center gap-2 px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition disabled:opacity-50 text-white font-medium"
            >
                {isLoading ? <FaSpinner className="animate-spin" /> : <FaUpload />}
                {isLoading ? 'Identifying...' : 'Identify Manga'}
            </button>
            {hasImage && (
                <button
                    onClick={onClear}
                    className="cursor-pointer px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition text-white"
                >
                    Clear
                </button>
            )}
        </div>
    );
}