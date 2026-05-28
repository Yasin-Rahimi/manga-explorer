// src/pages/ImageSearch/components/ResultDisplay.jsx
import { FaRobot } from 'react-icons/fa';

export default function ResultDisplay({ guessedName }) {
    if (!guessedName) return null;

    return (
        <div className="mt-6 p-4 bg-gray-800/70 rounded-xl border border-purple-500/30">
            <div className="flex items-start gap-2">
                <FaRobot className="text-purple-400 mt-0.5 shrink-0" />
                <div>
                    <p className="text-xs text-gray-400 uppercase tracking-wider">AI Guessed</p>
                    <p className="text-white font-semibold text-lg wrap-break-word">
                        {guessedName}
                    </p>
                </div>
            </div>
        </div>
    );
}