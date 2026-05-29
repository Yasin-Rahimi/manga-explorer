export default function MangaTitleSection({ title, titleJapanese }) {
    return (
        <div className="text-center lg:text-left min-w-0">
            
            <h1 className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-black tracking-tight text-white leading-tight drop-shadow-md wrap-break-word">
                {title ?? "Untitled"}
            </h1>

            {titleJapanese && (
                <p className="mt-2 text-sm sm:text-lg text-purple-400/90 font-medium font-sans wrap-break-word">
                    {titleJapanese}
                </p>
            )}
            
        </div>
    );
}