/**
 * Standardized API Response Helpers
 */

const sendSuccess = (res, data = null, message = 'Success', statusCode = 200) => {
  const response = {
    success: true,
    message,
  };
  if (data !== null && data !== undefined) {
    response.data = data;
  }
  return res.status(statusCode).json(response);
};

const sendCreated = (res, data = null, message = 'Resource created successfully') => {
  return sendSuccess(res, data, message, 201);
};

const sendError = (res, message = 'An error occurred', statusCode = 500, errors = null) => {
  const response = {
    success: false,
    message,
  };
  if (errors) {
    response.errors = errors;
  }
  return res.status(statusCode).json(response);
};

module.exports = {
  sendSuccess,
  sendCreated,
  sendError,
};
