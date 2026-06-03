const axios = require('axios');
const { HttpsProxyAgent } = require('https-proxy-agent');
const { SocksProxyAgent } = require('socks-proxy-agent');
const config = require('../config');
const { buildMangaSearchParams, buildMangaDetails, buildChapterList, buildChapterPages } = require('../utils/mangaDexHelper');

// Determine which proxy agent to use (if any)
function getProxyAgent() {
  // SOCKS5 proxy has higher priority
  if (process.env.SOCKS_PROXY) {
    console.log(`Using SOCKS5 proxy: ${process.env.SOCKS_PROXY}`);
    return new SocksProxyAgent(process.env.SOCKS_PROXY);
  }
  // HTTP/HTTPS proxy
  if (process.env.HTTPS_PROXY || process.env.HTTP_PROXY) {
    const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY;
    console.log(`Using HTTP proxy: ${proxyUrl}`);
    return new HttpsProxyAgent(proxyUrl);
  }
  console.log('No proxy configured – direct connection will be attempted.');
  return null;
}

const axiosInstance = axios.create({
  baseURL: config.mangadexBaseUrl,
  timeout: 0,                 // no timeout
  httpsAgent: getProxyAgent(), // apply the proxy agent
});

const pendingRequests = new Map();

async function dedupe(key, fn) {
  if (pendingRequests.has(key)) return pendingRequests.get(key);
  const p = fn().finally(() => pendingRequests.delete(key));
  pendingRequests.set(key, p);
  return p;
}

function handleErr(err) {
  console.error('MangaDex request failed:', err.message);
  if (err.response) {
    const s = err.response.status;
    console.error(`Status: ${s}, Data:`, JSON.stringify(err.response.data).slice(0, 200));
    if (s === 404) {
      const e = new Error('Manga not found');
      e.statusCode = 404;
      throw e;
    }
    if (s === 429) {
      const e = new Error('Too many requests to MangaDex. Please try later.');
      e.statusCode = 503;
      throw e;
    }
    const e = new Error('MangaDex upstream error');
    e.statusCode = 502;
    throw e;
  }
  if (err.code === 'ECONNREFUSED' || err.code === 'ENOTFOUND' || err.code === 'ETIMEDOUT') {
    const e = new Error('Cannot connect to MangaDex. Check your proxy/VPN.');
    e.statusCode = 502;
    throw e;
  }
  const e = new Error('Network error');
  e.statusCode = 502;
  throw e;
}

async function searchManga(q, limit = 10, offset = 0) {
  const params = buildMangaSearchParams(q, limit, offset);
  return dedupe(`search:${q}:${limit}:${offset}`, async () => {
    try {
      console.log(`Searching MangaDex for "${q}"...`);
      const response = await axiosInstance.get('/manga', { params });
      console.log(`Found ${response.data.data.length} results.`);
      const list = await Promise.all(response.data.data.map(buildMangaDetails));
      return { data: list, total: response.data.total, limit: response.data.limit, offset: response.data.offset };
    } catch (err) {
      handleErr(err);
    }
  });
}

async function getMangaById(id) {
  return dedupe(`manga:${id}`, async () => {
    try {
      const response = await axiosInstance.get(`/manga/${id}`, {
        params: { 'includes[]': 'cover_art' },
      });
      return buildMangaDetails(response.data.data);
    } catch (err) {
      handleErr(err);
    }
  });
}

async function getChapters(mangaId, limit = 30, offset = 0) {
  return dedupe(`chapters:${mangaId}:${limit}:${offset}`, async () => {
    try {
      const response = await axiosInstance.get(`/manga/${mangaId}/feed`, {
        params: {
          limit,
          offset,
          'translatedLanguage[]': 'en',
          'order[chapter]': 'desc',
          'includes[]': 'scanlation_group',
        },
      });
      return {
        data: response.data.data.map(buildChapterList),
        total: response.data.total,
        limit: response.data.limit,
        offset: response.data.offset,
      };
    } catch (err) {
      handleErr(err);
    }
  });
}

async function getChapterPages(chapterId) {
  return dedupe(`pages:${chapterId}`, async () => {
    try {
      const { data } = await axiosInstance.get(`/at-home/server/${chapterId}`);
      return buildChapterPages(chapterId, data);
    } catch (err) {
      handleErr(err);
    }
  });
}

module.exports = { searchManga, getMangaById, getChapters, getChapterPages };
