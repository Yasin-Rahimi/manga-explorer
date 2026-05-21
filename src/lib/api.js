import axios from "axios";

// Base URL for Jikan API
const api = axios.create({
    baseURL: "https://api.jikan.moe/v4"
});


// Get top manga
export async function getTopManga(page = 1) {
    const res = await axios.get(
        `https://api.jikan.moe/v4/top/manga?page=${page}`
    );

    return res.data;
}


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