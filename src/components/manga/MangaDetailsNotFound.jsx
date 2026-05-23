import BackButton from "../BackButton";

export default function MangaDetailsNotFound() {
    return (
        <div className="min-h-screen bg-[#0b0a12] text-white flex flex-col items-center justify-center gap-4 px-4 text-center">
            <p className="text-base sm:text-lg text-red-400 font-semibold">
                Manga details could not be found.
            </p>
            <BackButton />
        </div>
    );
}