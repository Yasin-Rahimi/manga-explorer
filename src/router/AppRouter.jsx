import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Search from "../pages/Search/Search";
import MangaDetails from "../pages/MangaDetails/MangaDetails";
import { searchLoader, searchAction, mangaDetailsLoader } from "../loaders";
import GlobalError from "./GlobalError";

export const router = createBrowserRouter([
    {
        element: <MainLayout />,
        errorElement: <GlobalError />,
        children: [
            {
                path: "/",
                element: <Home />,
            },
            {
                path: "/search",
                element: <Search />,
                loader: searchLoader,
                action: searchAction,
            },
            {
                path: "/manga/:id",
                element: <MangaDetails />,
                loader: mangaDetailsLoader,
            },
        ],
    },
]);