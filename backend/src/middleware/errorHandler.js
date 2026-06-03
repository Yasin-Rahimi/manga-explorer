const { errorResponse } = require('../utils/responseFormatter');
module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  console.error(`[ERROR] ${statusCode} - ${message}`);
  res.status(statusCode).json(errorResponse(message, statusCode));
};
