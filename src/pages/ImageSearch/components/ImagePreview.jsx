import { FaTrashAlt } from 'react-icons/fa';

export default function ImagePreview({ previewUrl, onClear }) {
    return (
        <div className="relative inline-block">
            <img
                src={previewUrl}
                alt="Preview"
                className="max-h-48 sm:max-h-64 mx-auto rounded-lg shadow-md"
            />
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    onClear();
                }}
                className="cursor-pointer absolute top-1 right-1 sm:top-2 sm:right-2 bg-black/70 text-white rounded-full p-1 sm:p-1.5 hover:bg-red-600 transition"
                title="Remove image"
            >
                <FaTrashAlt className="w-3 h-3 sm:w-4 sm:h-4" />
            </button>
        </div>
    );
}