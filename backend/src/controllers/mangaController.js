const service = require('../services/mangadexService');
const { successResponse } = require('../utils/responseFormatter');
exports.search = async (req, res, next) => { try { const r = await service.searchManga(req.query.q, req.query.limit, req.query.offset); res.json(successResponse(r.data, {total:r.total, limit:req.query.limit, offset:req.query.offset})); } catch(e){ next(e); } };
exports.getManga = async (req, res, next) => { try { const m = await service.getMangaById(req.params.id); res.json(successResponse(m)); } catch(e){ next(e); } };
exports.getChapters = async (req, res, next) => { try { const r = await service.getChapters(req.params.id, req.query.limit, req.query.offset); res.json(successResponse(r.data, {total:r.total, limit:req.query.limit, offset:req.query.offset})); } catch(e){ next(e); } };
exports.getChapterPages = async (req, res, next) => { try { const p = await service.getChapterPages(req.params.chapterId); res.json(successResponse(p)); } catch(e){ next(e); } };
