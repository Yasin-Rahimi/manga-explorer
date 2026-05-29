import { FaThumbsUp, FaThumbsDown, FaRobot } from "react-icons/fa";

export default function AISummary({ summary, error }) {

    if (error) {
        return (
            <div className="mt-4 p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-200 text-sm">
                {error}
            </div>
        );
    }

    if (!summary) return null;

    const extractPositive = (summaryText) => {
        const match = summaryText.match(/\*\*Positive Points:\*\*([\s\S]*?)\*\*Negative Points:\*\*/i);
        return match?.[1]?.trim() || "No positive points extracted.";
    };

    const extractNegative = (summaryText) => {
        const match = summaryText.match(/\*\*Negative Points:\*\*([\s\S]*)/i);
        return match?.[1]?.trim() || "No negative points extracted.";
    };

    return (

        <div className="mt-4 mb-4 p-4 bg-purple-900/20 border border-purple-500/40 rounded-xl shadow-md">
            
            <div className="flex items-center gap-2 mb-3">
                <FaRobot className="text-purple-400" />
                <h4 className="text-sm font-bold text-purple-300 uppercase tracking-wider">AI Summary</h4>
            </div>

            <div className="space-y-3 text-sm">
                
                <div className="flex items-start gap-2">
                    <FaThumbsUp className="text-green-400 mt-0.5 shrink-0" />
                    <div className="font-semibold text-gray-100 whitespace-pre-wrap">
                        {extractPositive(summary)}
                    </div>
                </div>

                <div className="flex items-start gap-2">
                    <FaThumbsDown className="text-red-400 mt-0.5 shrink-0" />
                    <div className="font-semibold text-gray-100 whitespace-pre-wrap">
                        {extractNegative(summary)}
                    </div>
                </div>
                
            </div>

        </div>

    );
}