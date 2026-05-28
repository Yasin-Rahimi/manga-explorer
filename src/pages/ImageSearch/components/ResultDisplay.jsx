// src/pages/ImageSearch/components/ResultDisplay.jsx
import { FaExternalLinkAlt, FaBook, FaRobot } from 'react-icons/fa';

export default function ResultDisplay({ guessedName, url }) {
    if (!guessedName && !url) return null;

    return (
        <div className="mt-6 p-4 bg-gray-800/70 rounded-xl border border-purple-500/30 space-y-3">
            {guessedName && (
                <div className="flex items-start gap-2">
                    <FaRobot className="text-purple-400 mt-0.5 shrink-0" />
                    <div>
                        <p className="text-xs text-gray-400 uppercase tracking-wider">AI Guessed</p>
                        <p className="text-white font-semibold text-lg wrap-break-word">
                            {guessedName}
                        </p>
                    </div>
                </div>
            )}
            
            {url && (
                <div className="flex items-start gap-2">
                    <FaBook className="text-blue-400 mt-0.5 shrink-0" />
                    <div className="flex-1">
                        <p className="text-xs text-gray-400 uppercase tracking-wider">MangaDex Link</p>
                        <a
                            href={url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 text-sm text-blue-400 hover:underline break-all"
                        >
                            {url}
                            <FaExternalLinkAlt className="w-3 h-3 shrink-0" />
                        </a>
                    </div>
                </div>
            )}
        </div>
    );
}