export default function Loading({ text = "Loading..." }) {
    return (
        <div className="w-full flex justify-center items-center py-10">
            <p className="text-gray-400 animate-pulse text-sm">
                {text}
            </p>
        </div>
    );
}