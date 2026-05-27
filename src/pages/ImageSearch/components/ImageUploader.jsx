import { useState, useRef } from 'react';
import { FaUpload, FaSpinner, FaImage, FaExternalLinkAlt, FaTrashAlt } from 'react-icons/fa';
import { identifyMangaFromImage } from '../../../lib/gptVision';

export default function ImageUploader() {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState('');
    const [error, setError] = useState('');
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        if (!file.type.startsWith('image/')) {
            setError('Please select a valid image file (PNG, JPG, WEBP).');
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setError('Image size must be less than 5MB.');
            return;
        }

        setError('');
        setSelectedFile(file);
        setPreviewUrl(URL.createObjectURL(file));
        setResult('');
    };

    const clearImage = () => {
        setSelectedFile(null);
        setPreviewUrl(null);
        setResult('');
        setError('');
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    const handleIdentify = async () => {
        if (!selectedFile) {
            setError('No image selected.');
            return;
        }

        setLoading(true);
        setError('');
        setResult('');

        try {
            const reader = new FileReader();
            reader.readAsDataURL(selectedFile);
            reader.onload = async () => {
                const base64String = reader.result.split(',')[1]; // remove data:image/...;base64,
                const mimeType = selectedFile.type;
                const answer = await identifyMangaFromImage(base64String, mimeType);
                setResult(answer);
                setLoading(false);
            };
            reader.onerror = () => {
                setError('Failed to read image file.');
                setLoading(false);
            };
        } catch (err) {
            setError(err.message || 'Something went wrong.');
            setLoading(false);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto p-6 bg-white/5 rounded-2xl border border-white/10 backdrop-blur-sm shadow-xl">
            <h2 className="text-2xl font-bold text-white mb-2">🔍 Search Manga by Image</h2>
            <p className="text-gray-300 text-sm mb-6">
                Upload a manga panel or cover. AI will try to identify it and provide a buy link.
            </p>

            <div
                className="border-2 border-dashed border-gray-500 rounded-xl p-6 text-center cursor-pointer hover:border-purple-400 transition-colors duration-200"
                onClick={() => fileInputRef.current.click()}
            >
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    className="hidden"
                />
                {previewUrl ? (
                    <div className="relative inline-block">
                        <img
                            src={previewUrl}
                            alt="Preview"
                            className="max-h-64 mx-auto rounded-lg shadow-md"
                        />
                        <button
                            onClick={(e) => { e.stopPropagation(); clearImage(); }}
                            className="absolute top-2 right-2 bg-black/70 text-white rounded-full p-1.5 hover:bg-red-600 transition"
                            title="Remove image"
                        >
                            <FaTrashAlt className="w-4 h-4" />
                        </button>
                    </div>
                ) : (
                    <div className="py-8 text-gray-400">
                        <FaImage className="w-12 h-12 mx-auto mb-3 opacity-50" />
                        <p>Click or drag an image here</p>
                        <p className="text-xs mt-2">PNG, JPG, WEBP up to 5MB</p>
                    </div>
                )}
            </div>

            <div className="flex gap-3 mt-6">
                <button
                    onClick={handleIdentify}
                    disabled={!selectedFile || loading}
                    className="flex items-center gap-2 px-5 py-2 bg-purple-600 hover:bg-purple-700 rounded-lg transition disabled:opacity-50 text-white font-medium"
                >
                    {loading ? <FaSpinner className="animate-spin" /> : <FaUpload />}
                    {loading ? 'Identifying...' : 'Identify Manga'}
                </button>
                {selectedFile && (
                    <button
                        onClick={clearImage}
                        className="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg transition text-white"
                    >
                        Clear
                    </button>
                )}
            </div>

            {error && (
                <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-sm">
                    ⚠️ {error}
                </div>
            )}

            {result && (
                <div className="mt-6 p-4 bg-gray-800/70 rounded-xl border border-purple-500/30">
                    <h3 className="text-lg font-semibold text-purple-300 mb-2">🔎 Result:</h3>
                    <p className="text-white wrap-break-word whitespace-pre-wrap">{result}</p>
                    {result.includes('http') && (
                        <a
                            href={result}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 mt-3 text-sm text-blue-400 hover:underline"
                        >
                            Open link <FaExternalLinkAlt className="w-3 h-3" />
                        </a>
                    )}
                </div>
            )}

            <p className="text-xs text-gray-500 mt-6 text-center">
                * Powered by GPT-5.5 Vision. Results may not be 100% accurate.
            </p>
        </div>
    );
}