import { useNavigate } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import TrendingManager from "../components/TrendingManager";
import { useState } from "react";

export default function Home() {
    const navigate = useNavigate();
    const [query, setQuery] = useState("");
    const [isEmpty, setIsEmpty] = useState(true);
    const [submitClicked, setSubmitClicked] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setSubmitClicked(true);
        if (!query) {
            setIsEmpty(true);
            return;
        }
        setIsEmpty(false);
        navigate(`/search?q=${query}`);
    };

    return (
        <div className="min-h-screen bg-linear-to-br from-black via-purple-950 to-black text-white">
            <Header
                query={query}
                setQuery={setQuery}
                handleSearch={handleSearch}
                isEmpty={isEmpty}
                submitClicked={submitClicked}
            />
            <TrendingManager />
            <Footer />
        </div>
    );
}