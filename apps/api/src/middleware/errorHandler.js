function errorHandler(err, req, res, next) {
  console.error(err);

  if (err.statusCode && err.responded) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors || {},
    });
  }

  return res.status(500).json({
    success: false,
    message: 'Internal server error',
    errors: {},
  });
}

module.exports = errorHandler;