import { createBrowserRouter } from "react-router";

import MainLayout from "../layouts/MainLayout";

import Home from "../pages/Home";
import Search, { searchLoader } from "../pages/Search";
import MangaDetails, { mangaDetailsLoader } from "../pages/MangaDetails";


export const router = createBrowserRouter([
    {
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/search",
                element: <Search />,
                loader: searchLoader,
            },
            {
                path: "/manga/:id",
                element: <MangaDetails />,
                loader: mangaDetailsLoader,
            },
        ],
    },
]);