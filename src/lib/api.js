import axios from "axios";

const api = axios.create({
    baseURL: "https://api.jikan.moe/v4"
});

export async function getTopManga(page = 1) {
    const res = await api.get(`/top/manga?page=${page}`);
    return res.data;
}

export async function searchManga(query) {
    const res = await api.get(`/manga?q=${query}`);
    return res.data;
}

export async function getMangaById(id) {
    const res = await api.get(`/manga/${id}`);
    return res.data;
}