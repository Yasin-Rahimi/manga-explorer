import { FaExclamationTriangle } from 'react-icons/fa';

export default function ErrorMessage({ message }) {
    if (!message) return null;
    return (
        <div className="mt-4 p-3 bg-red-900/50 border border-red-500 rounded-lg text-red-200 text-sm flex items-start gap-2">
            <FaExclamationTriangle className="shrink-0 mt-0.5" />
            <span>{message}</span>
        </div>
    );
}