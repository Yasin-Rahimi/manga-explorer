import { FaImage } from 'react-icons/fa';
import ImagePreview from './ImagePreview';

export default function ImageDropzone({ previewUrl, onClear, onClick }) {
    return (

        <div
            className="border-2 border-dashed border-gray-500 rounded-xl p-5 sm:p-6 text-center cursor-pointer hover:border-purple-400 transition-colors duration-200"
            onClick={onClick}
        >
            {previewUrl ? (
                <ImagePreview previewUrl={previewUrl} onClear={onClear} />
            ) : (
                <div className="py-5 sm:py-8 text-gray-400">
                    <FaImage className="w-10 h-10 sm:w-12 sm:h-12 mx-auto mb-2 sm:mb-3 opacity-50" />
                    <p className="text-sm sm:text-base">Click or drag an image here</p>
                    <p className="text-[11px] sm:text-xs mt-1 sm:mt-2">PNG, JPG, WEBP up to 5MB</p>
                </div>
            )}
        </div>

    );
}