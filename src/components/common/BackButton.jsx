// src/components/common/BackButton.jsx
import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

export default function BackButton() {
    const navigate = useNavigate();

    return (
        <button
            onClick={() => {
                if (window.history.length > 1) {
                    navigate(-1);
                } else {
                    navigate("/");
                }
            }}
            className="
                flex items-center gap-1.5 sm:gap-2
                px-2 py-1.5 sm:px-4 sm:py-2
                rounded-lg
                bg-purple-600
                hover:bg-purple-500
                transition
                text-white
                cursor-pointer
                text-xs sm:text-base
            "
            aria-label="Go back"
        >
            <FaArrowLeft className="w-3 h-3 sm:w-5 sm:h-5" />
            <span className="hidden sm:inline">Back</span>
        </button>
    );
}