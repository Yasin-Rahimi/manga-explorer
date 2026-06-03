const Redis = require('ioredis');
const config = require('../config');
let redis = null;
if (config.redisUrl) {
  redis = new Redis(config.redisUrl, { maxRetriesPerRequest:3, lazyConnect:true });
} else {
  console.warn('No REDIS_URL set – caching disabled.');
}
module.exports = redis;
