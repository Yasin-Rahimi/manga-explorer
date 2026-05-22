export default function Error({ message }) {
    return (
        <div className="w-full flex flex-col items-center justify-center py-10 px-4 text-center max-w-md mx-auto">
            {/* Elegant glassmorphic alert box */}
            <div className="w-full p-6 rounded-2xl bg-linear-to-b from-rose-950/20 to-neutral-950/20 border border-rose-500/10 backdrop-blur-md shadow-xl flex flex-col items-center">
                
                {/* Warning icon badge */}
                <div className="w-12 h-12 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center mb-4 text-rose-400 shadow-inner animate-[pulse_3s_infinite]">
                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                </div>

                {/* Main error message text */}
                <p className="text-neutral-300 mb-5 text-sm font-medium leading-relaxed max-w-xs">
                    {message}
                </p>

            </div>
        </div>
    );
}