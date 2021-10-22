function createError(statusCode, message) {
  const _error = new Error(message);
  _error.status = statusCode;
  return _error;
}

module.exports = createError;
