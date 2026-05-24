import { createBrowserRouter } from "react-router";
import Home from "../pages/Home";
import Search, { searchLoader } from "../pages/Search";
import MangaDetails, { mangaDetailsLoader } from "../pages/MangaDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        Component: Home,
        // بدون loader – صفحه‌بندی با state داخلی
    },
    {
        path: "/search",
        Component: Search,
        loader: searchLoader,
    },
    {
        path: "/manga/:id",
        Component: MangaDetails,
        loader: mangaDetailsLoader,
    },
]);