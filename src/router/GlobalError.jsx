import { useRouteError, Link } from "react-router";

export default function GlobalError() {

    const error = useRouteError();
    console.error("Global error:", error);
    let message = "Something went wrong.";

    if (error?.status === 404) {
        message = "Page not found.";
    } else if (error?.message) {
        message = error.message;
    }

    return (

        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-4 text-center">
            
            <div className="w-16 h-16 rounded-full bg-red-500/20 flex items-center justify-center mb-4">
                <span className="text-3xl">⚠️</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Oops!</h1>

            <p className="text-gray-400 mb-6">{message}</p>

            <Link
                to="/"
                className="px-6 py-2 bg-purple-600 rounded-lg hover:bg-purple-500 transition"
            >
                Go back home
            </Link>

        </div>

    );
}