import { BrowserRouter, Routes, Route } from "react-router";
import Home from "../pages/Home";
import Search from "../pages/Search";
import MangaDetails from "../pages/MangaDetails";

export default function AppRouter() {
    return (
        <BrowserRouter>
            {/* Main routing configuration */}
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/search" element={<Search />} />
                <Route path="/manga/:id" element={<MangaDetails />} />
            </Routes>
        </BrowserRouter>
    );
}