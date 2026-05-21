export default function Empty({ message = "Nothing found." }) {
    return (
        <div className="w-full flex justify-center items-center py-10">
            <p className="text-gray-500 text-sm">
                {message}
            </p>
        </div>
    );
}