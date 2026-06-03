const { z } = require('zod');
const schemas = {
  searchQuery: z.object({ q:z.string().min(1).max(200), limit:z.coerce.number().int().min(1).max(100).default(10), offset:z.coerce.number().int().min(0).default(0) }),
  mangaId: z.object({ id:z.string().uuid() }),
  chaptersQuery: z.object({ limit:z.coerce.number().int().min(1).max(100).default(30), offset:z.coerce.number().int().min(0).default(0) }),
  chapterId: z.object({ chapterId:z.string().uuid() })
};
function validate(schemaName, source='query') {
  return (req, res, next) => {
    const data = source==='params' ? req.params : req.query;
    const result = schemas[schemaName].safeParse(data);
    if(!result.success) return res.status(400).json({success:false, error:{message:'Validation failed', details:result.error.flatten()}});
    if(source==='params') req.params = result.data; else req.query = result.data;
    next();
  };
}
module.exports = { validate };
