const { errorResponse } = require('../utils/response');

function errorHandler(err, req, res, next) {
  console.error(`[ERROR] ${req.method} ${req.originalUrl}:`, err.message);

  if (res.headersSent) {
    return next(err);
  }

  if (err.name === 'JsonWebTokenError') {
    return errorResponse(res, 401, 'Invalid token');
  }

  if (err.name === 'TokenExpiredError') {
    return errorResponse(res, 401, 'Token has expired');
  }

  if (err.type === 'entity.parse.failed') {
    return errorResponse(res, 400, 'Invalid JSON in request body');
  }

  if (err.code === 'ER_DUP_ENTRY') {
    return errorResponse(res, 409, 'A record with that value already exists');
  }

  const statusCode = err.statusCode || 500;
  const message = statusCode === 500 ? 'Internal Server Error' : err.message;

  return errorResponse(res, statusCode, message);
}

module.exports = errorHandler;
