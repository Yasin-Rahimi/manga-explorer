import { useRef, useEffect } from "react";
import { FaSearch, FaRobot } from "react-icons/fa";

export default function SearchInput({
    isAIMode,
    isQueryEmpty,
    isDesktop,
    inputValue,
    inputRef,
    onInputChange,
    onFocus,
    onToggleMode
}) {

    useEffect(() => {
        const handleSlash = (e) => {
            if (e.key === '/' && document.activeElement !== inputRef.current) {
                e.preventDefault();
                inputRef.current?.focus();
            }
        };
        document.addEventListener('keydown', handleSlash);
        return () => document.removeEventListener('keydown', handleSlash);
    }, [inputRef]);

    return (

        <div className="relative flex-1">
            <div className="absolute left-2 top-1/2 -translate-y-1/2 flex items-center z-10">
                
                <div
                    className={`absolute left-0 top-0 h-full w-7 transition-all duration-300 ease-out bg-purple-500/30 rounded-md ${
                        isAIMode ? 'translate-x-full' : 'translate-x-0'
                    }`}
                    style={{ width: '28px' }}
                />

                <button
                    type="button"
                    onClick={() => onToggleMode('normal')}
                    className={`cursor-pointer relative p-1 rounded-md transition-colors w-7 h-7 flex items-center justify-center ${
                        !isAIMode ? 'text-purple-400' : 'text-gray-400 hover:text-white'
                    }`}
                    title="Normal search"
                >
                    <FaSearch className="w-4 h-4" />
                </button>

                <button
                    type="button"
                    onClick={() => onToggleMode('ai')}
                    className={`cursor-pointer relative p-1 rounded-md transition-colors w-7 h-7 flex items-center justify-center ${
                        isAIMode ? 'text-purple-400' : 'text-gray-400 hover:text-white'
                    }`}
                    title="AI search"
                >
                    <FaRobot className="w-4 h-4" />
                </button>

            </div>

            <input
                ref={inputRef}
                name="q"
                type="text"
                autoComplete="new-password"
                value={inputValue}
                onChange={onInputChange}
                onFocus={onFocus}
                placeholder={isAIMode ? "Ask AI to find manga..." : "Search for manga..."}
                className={`
                    w-full pl-18 pr-3 py-2 text-sm rounded-xl border transition-all duration-300 focus:outline-none focus:ring-2 text-white placeholder-gray-400
                    ${isAIMode 
                        ? 'border-purple-400 bg-purple-900/30 focus:ring-purple-500/50 shadow-[0_0_12px_rgba(168,85,247,0.4)]' 
                        : 'bg-white/5 border-white/10 focus:ring-purple-500/50 focus:bg-white/10'
                    }
                    ${isQueryEmpty ? 'border-red-500' : ''}
                `}
            />

        </div>
        
    );
}
