// src/pages/ImageSearch/components/ResultDisplay.jsx
import { FaRobot, FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router';

export default function ResultDisplay({ primaryGuess, alternativeGuesses, jikan }) {
    if (!primaryGuess) return null;

    return (
        <div className="mt-6 p-4 bg-gray-800/70 rounded-xl border border-purple-500/30 space-y-4">
            {/* حدس اصلی */}
            <div className="flex items-start gap-2">
                <FaRobot className="text-purple-400 mt-0.5 shrink-0" />
                <div className="flex-1">
                    <p className="text-xs text-gray-400 uppercase tracking-wider">Primary Guess</p>
                    {jikan?.found ? (
                        <Link
                            to={jikan.url}
                            className="text-white font-semibold text-lg hover:text-purple-300 transition flex items-center gap-1 wrap-break-word"
                        >
                            {primaryGuess}
                            <FaExternalLinkAlt className="w-3 h-3 text-gray-400" />
                        </Link>
                    ) : (
                        <p className="text-white font-semibold text-lg wrap-break-word">
                            {primaryGuess}
                        </p>
                    )}
                    {jikan?.found && (
                        <p className="text-xs text-gray-400 mt-1">Click to view details</p>
                    )}
                    {!jikan?.found && (
                        <p className="text-xs text-yellow-400 mt-1">Not found in our database</p>
                    )}
                </div>
            </div>

            {alternativeGuesses && alternativeGuesses.length > 0 && (
                <div className="border-t border-white/10 pt-3">
                    <p className="text-xs text-gray-400 uppercase tracking-wider mb-2">Other possible matches</p>
                    <ul className="space-y-1">
                        {alternativeGuesses.map((guess, idx) => (
                            <li key={idx} className="text-gray-300 text-sm flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-purple-400 rounded-full"></span>
                                {guess}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}