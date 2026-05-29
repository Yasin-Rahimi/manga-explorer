import { useState } from "react";
import { Outlet, useNavigate } from "react-router";
import Header from "../components/common/Header/Header";
import Footer from "../components/common/Footer";
import ScrollToTop from "../components/common/ScrollToTop";

export default function MainLayout() {
    const navigate = useNavigate();

    const [query, setQuery] = useState("");
    const [isEmpty, setIsEmpty] = useState(true);
    const [submitClicked, setSubmitClicked] = useState(false);

    const handleSearch = (e) => {
        e.preventDefault();
        setSubmitClicked(true);

        if (!query.trim()) {
            setIsEmpty(true);
            return;
        }

        setIsEmpty(false);
        navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    };

    return (
        <div className="h-fit bg-linear-to-br from-black via-purple-950 to-black text-white">
            <ScrollToTop />
            <Header
                query={query}
                setQuery={setQuery}
                handleSearch={handleSearch}
                isEmpty={isEmpty}
                submitClicked={submitClicked}
            />

            <main>
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}