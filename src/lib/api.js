import axios from "axios";

// Base URL for Jikan API
const api = axios.create({
    baseURL: "https://api.jikan.moe/v4"
});


// Get top manga
export const getTopManga = async () => {
    const res = await api.get("/top/manga");
    return res.data;
};


// Search manga
export const searchManga = async (query) => {
    const res = await api.get(`/manga?q=${query}`);
    return res.data;
};


// Get manga details
export const getMangaById = async (id) => {
    const res = await api.get(`/manga/${id}`);
    return res.data;
};