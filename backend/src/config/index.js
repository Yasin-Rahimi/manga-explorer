require('dotenv').config();
module.exports = {
  port: process.env.PORT || 3000,
  mangadexBaseUrl: process.env.MANGADEX_BASE_URL || 'https://api.mangadex.org',
  redisUrl: process.env.REDIS_URL || 'redis://127.0.0.1:6379',
  cacheTTL: {
    manga: parseInt(process.env.CACHE_TTL_MANGA,10)||3600,
    search: parseInt(process.env.CACHE_TTL_SEARCH,10)||300,
    chapters: parseInt(process.env.CACHE_TTL_CHAPTERS,10)||1800,
    pages: parseInt(process.env.CACHE_TTL_PAGES,10)||86400
  },
  nodeEnv: process.env.NODE_ENV || 'development'
};
