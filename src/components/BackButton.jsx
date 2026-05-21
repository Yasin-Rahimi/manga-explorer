import { useNavigate } from "react-router";

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
                px-4 py-2
                rounded-lg
                bg-purple-600
                hover:bg-purple-500
                transition
                text-white
                cursor-pointer
            "
        >
            ← Back
        </button>
    );
}