// Proxy global for fetch (used by mangadex-full-api)
const { ProxyAgent, setGlobalDispatcher } = require('undici');
const proxyUrl = process.env.HTTPS_PROXY || process.env.HTTP_PROXY || 'http://127.0.0.1:10809';
if (proxyUrl) {
    setGlobalDispatcher(new ProxyAgent(proxyUrl));
    console.log(`✅ Global fetch proxy set to ${proxyUrl}`);
} else {
    console.log('⚠️  No proxy configured – direct connection will be attempted.');
}

const express = require('express');
const cors = require('cors');
const config = require('./config');
const mangaRoutes = require('./routes/manga');
const errorHandler = require('./middleware/errorHandler');
const app = express();
app.use(cors());
app.use(express.json());
app.get('/health',(_,res)=>res.json({status:'ok'}));
app.use('/api/manga', mangaRoutes);
app.get('/api/chapter/:chapterId/pages',
  require('./middleware/validateRequest').validate('chapterId','params'),
  require('./cache/cacheMiddleware')(req=>`cache:pages:${req.params.chapterId}`, config.cacheTTL.pages),
  require('./controllers/mangaController').getChapterPages
);
app.use(errorHandler);
if(process.env.NODE_ENV!=='test') app.listen(config.port, ()=>console.log(`Backend on port ${config.port}`));
module.exports = app;
