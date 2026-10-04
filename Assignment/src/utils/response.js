function successResponse(res, statusCode, message, data = null) {
  const response = {
    success: true,
    message
  };

  if (data !== null) {
    response.data = data;
  }

  return res.status(statusCode).json(response);
}

function errorResponse(res, statusCode, message) {
  return res.status(statusCode).json({
    success: false,
    message
  });
}

module.exports = { successResponse, errorResponse };
