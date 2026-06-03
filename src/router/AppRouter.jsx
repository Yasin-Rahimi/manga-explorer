import { createBrowserRouter } from "react-router";
import MainLayout from "../layouts/MainLayout";
import Home from "../pages/Home/Home";
import Search from "../pages/Search/Search";
import MangaDetails from "../pages/MangaDetails/MangaDetails";
import { mangaDetailsLoader } from "../loaders";
import GlobalError from "./GlobalError";
import ImageSearch from "../pages/ImageSearch/ImageSearch";
import AISearch from "../pages/AISearch/AISearch";
import MangaReader from "../pages/MangaReader/MangaReader";

export const router = createBrowserRouter([
  {
    element: <MainLayout />,
    errorElement: <GlobalError />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/search", element: <Search /> },
      { path: "/manga/:id", element: <MangaDetails />, loader: mangaDetailsLoader },
      { path: "/manga/:mangaId/read", element: <MangaReader /> },
      { path: "/image-search", element: <ImageSearch /> },
      { path: "/ai-search", element: <AISearch /> },
    ],
  },
]);
