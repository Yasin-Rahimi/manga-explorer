// src/pages/ImageSearch/components/ResultDisplay.jsx
import { FaRobot, FaExternalLinkAlt } from 'react-icons/fa';
import { Link } from 'react-router';

export default function ResultDisplay({ primaryGuess, alternativeGuesses }) {
    if (!primaryGuess || !primaryGuess.title) return null;

    return (
        <div className="mt-3 sm:mt-6 p-2 sm:p-4 bg-gray-800/70 rounded-xl border border-purple-500/30 space-y-2 sm:space-y-4">
            {/* حدس اصلی */}
            <div className="flex items-start gap-1.5 sm:gap-2">
                <FaRobot className="text-purple-400 mt-0.5 shrink-0 text-xs sm:text-base" />
                <div className="flex-1 min-w-0">
                    <p className="text-[9px] sm:text-xs text-gray-400 uppercase tracking-wider">Primary Guess</p>
                    {primaryGuess.found ? (
                        <Link
                            to={primaryGuess.url}
                            className="text-white font-semibold text-xs sm:text-lg hover:text-purple-300 transition flex items-center gap-1 wrap-break-word"
                        >
                            <span className="wrap-break-word">{primaryGuess.title}</span>
                            <FaExternalLinkAlt className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-gray-400 shrink-0" />
                        </Link>
                    ) : (
                        <p className="text-white font-semibold text-xs sm:text-lg wrap-break-word">
                            {primaryGuess.title}
                        </p>
                    )}
                    {!primaryGuess.found && (
                        <p className="text-[9px] sm:text-xs text-yellow-400 mt-0.5 sm:mt-1">Not found in our database</p>
                    )}
                </div>
            </div>

            {/* حدس‌های جایگزین */}
            {alternativeGuesses && alternativeGuesses.length > 0 && (
                <div className="border-t border-white/10 pt-2 sm:pt-3">
                    <p className="text-[9px] sm:text-xs text-gray-400 uppercase tracking-wider mb-1 sm:mb-2">Other possible matches</p>
                    <ul className="space-y-1">
                        {alternativeGuesses.map((guess, idx) => (
                            <li key={idx} className="text-gray-300 text-[11px] sm:text-sm flex items-start gap-1.5 sm:gap-2 wrap-break-word">
                                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-purple-400 rounded-full shrink-0 mt-1"></span>
                                <div className="flex-1 min-w-0">
                                    {guess.found ? (
                                        <Link
                                            to={guess.url}
                                            className="hover:text-purple-300 transition flex items-center gap-1 wrap-break-word text-[11px] sm:text-sm"
                                        >
                                            <span className="wrap-break-word">{guess.title}</span>
                                            <FaExternalLinkAlt className="w-2 h-2 sm:w-3 sm:h-3 text-gray-400 shrink-0" />
                                        </Link>
                                    ) : (
                                        <span className="wrap-break-word text-[11px] sm:text-sm">{guess.title}</span>
                                    )}
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}