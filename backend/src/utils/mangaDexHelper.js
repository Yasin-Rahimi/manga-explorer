const config = require('../config');
function buildMangaDetails(raw) {
  const attr = raw.attributes;
  const title = attr.title?.en || Object.values(attr.title)[0] || 'Untitled';
  let coverFileName = null;
  const coverRel = raw.relationships?.find(r=>r.type==='cover_art');
  if(coverRel?.attributes) coverFileName = coverRel.attributes.fileName;
  return {
    id: raw.id, title,
    description: attr.description?.en || '',
    coverImage: coverFileName ? `https://uploads.mangadex.org/covers/${raw.id}/${coverFileName}` : null,
    status: attr.status || 'unknown',
    tags: attr.tags?.map(t=>t.attributes?.name?.en) || [],
    contentRating: attr.contentRating,
    createdAt: attr.createdAt,
    updatedAt: attr.updatedAt
  };
}
function buildChapterList(raw) {
  const attr = raw.attributes;
  return {
    id: raw.id,
    title: attr.title || `Chapter ${attr.chapter}`,
    chapterNumber: attr.chapter,
    volume: attr.volume,
    translatedLanguage: attr.translatedLanguage,
    publishAt: attr.publishAt,
    pages: attr.pages,
    scanlationGroup: raw.relationships?.find(r=>r.type==='scanlation_group')?.attributes?.name || null
  };
}
function buildChapterPages(chapterId, atHomeData) {
  const { baseUrl, chapter } = atHomeData;
  const { hash, data } = chapter;
  return {
    chapterId,
    pages: data.map(fn => `${baseUrl}/data/${hash}/${fn}`)
  };
}
function buildMangaSearchParams(query, limit, offset) {
  return { title: query, limit, offset, 'includes[]':'cover_art', 'order[relevance]':'desc' };
}
module.exports = { buildMangaDetails, buildChapterList, buildChapterPages, buildMangaSearchParams };
