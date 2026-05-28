import { FaImage, FaTrashAlt } from 'react-icons/fa';
import ImagePreview from './ImagePreview';

export default function ImageDropzone({ previewUrl, onClear, onClick }) {
    return (
        <div
            className="border-2 border-dashed border-gray-500 rounded-xl p-6 text-center cursor-pointer hover:border-purple-400 transition-colors duration-200"
            onClick={onClick}
        >
            {previewUrl ? (
                <ImagePreview previewUrl={previewUrl} onClear={onClear} />
            ) : (
                <div className="py-8 text-gray-400">
                    <FaImage className="w-12 h-12 mx-auto mb-3 opacity-50" />
                    <p>Click or drag an image here</p>
                    <p className="text-xs mt-2">PNG, JPG, WEBP up to 5MB</p>
                </div>
            )}
        </div>
    );
}