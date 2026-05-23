import { createBrowserRouter } from "react-router";
import Home, { homeLoader } from "../pages/Home";
import Search, { searchLoader } from "../pages/Search";
import MangaDetails, { mangaDetailsLoader } from "../pages/MangaDetails";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Home />,
        loader: homeLoader
    },
    {
        path: "/search",
        element: <Search />,
        loader: searchLoader
    },
    {
        path: "/manga/:id",
        element: <MangaDetails />,
        loader: mangaDetailsLoader
    }
]);