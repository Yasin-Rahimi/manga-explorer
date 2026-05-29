export default function Loading({ text = "Loading..." }) {
    return (
        <div className="w-full flex flex-col justify-center items-center py-12 px-4">

            <div className="relative flex items-center justify-center">
                
                <div className="absolute w-16 h-16 rounded-full bg-linear-to-tr from-purple-600 via-indigo-600 to-blue-500 opacity-20 blur-md animate-pulse">
                </div>
                
                <div className="relative w-12 h-12">
                    <div className="absolute inset-0 rounded-full border-2 border-purple-500/10"></div>
                    <div className="absolute inset-0 rounded-full border-2 border-t-purple-500 border-r-indigo-500 animate-spin"></div>
                    <div className="absolute inset-2 rounded-full border border-dashed border-purple-400/20 animate-[spin_3s_linear_infinite_reverse]"></div>
                </div>

            </div>

            <p className="mt-5 text-neutral-400 font-medium tracking-wide text-sm animate-pulse flex items-center gap-1.5 selection:bg-purple-500/30">
                <span className="inline-block w-1.5 h-1.5 rounded-full bg-purple-500 animate-ping"></span>
                {text}
            </p>
            
        </div>
    );
}