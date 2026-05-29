const ANILIST_API = 'https://graphql.anilist.co';

const query = `
query ($id: Int) {
  Media(id: $id, type: ANIME) {
    id
    title {
      romaji
      english
      native
    }
    coverImage {
      large
    }
    averageScore
    siteUrl
  }
}
`;

/**
 * دریافت اطلاعات یک انیمه از AniList با شناسهٔ anilist
 * @param {number} anilistId
 * @returns {Promise<Object|null>} اطلاعات مدیا یا null
 */
export async function getAnimeById(anilistId) {
  const response = await fetch(ANILIST_API, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { id: anilistId } }),
  });
  if (!response.ok) return null;
  const json = await response.json();
  return json.data?.Media || null;
}
