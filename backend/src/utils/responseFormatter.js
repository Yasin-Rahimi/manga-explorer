function successResponse(data, meta={}) { return { success:true, data, ...(Object.keys(meta).length && {meta}) }; }
function errorResponse(message, statusCode=500, details=null) { return { success:false, error:{message, code:statusCode, ...(details&&{details})} }; }
module.exports = { successResponse, errorResponse };
