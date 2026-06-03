const BACKEND_URL = "http://localhost:3000/api";

export async function fetchChapters(mangaId, limit = 100, offset = 0) {
  const res = await fetch(`${BACKEND_URL}/manga/${mangaId}/chapters?limit=${limit}&offset=${offset}`);
  if (!res.ok) throw new Error("Failed to fetch chapters");
  const json = await res.json();
  return json.data;
}

export async function fetchChapterPages(chapterId) {
  const res = await fetch(`${BACKEND_URL}/chapter/${chapterId}/pages`);
  if (!res.ok) throw new Error("Failed to fetch pages");
  const json = await res.json();
  return json.data;
}

export async function getMangaDexIdByTitle(title) {
  const res = await fetch(`${BACKEND_URL}/manga/search?q=${encodeURIComponent(title)}&limit=1`);
  if (!res.ok) throw new Error("Failed to find MangaDex ID");
  const json = await res.json();
  if (json.data && json.data.length > 0) {
    return json.data[0].id;
  }
  throw new Error("No matching manga found on MangaDex");
}
