const redis = require('./redisClient');
function cacheMiddleware(keyGenerator, ttl) {
  return async (req, res, next) => {
    if (!redis || redis.status !== 'ready') return next();
    const key = keyGenerator(req);
    if (!key) return next();
    try {
      const cached = await redis.get(key);
      if (cached) return res.json(JSON.parse(cached));
    } catch(e) { console.error('Cache read error:',e); }
    const originalJson = res.json.bind(res);
    res.json = function(body) {
      if (res.statusCode===200 && redis) redis.set(key, JSON.stringify(body), 'EX', ttl).catch(e=>console.error('Cache write error:',e));
      return originalJson(body);
    };
    next();
  };
}
module.exports = cacheMiddleware;
