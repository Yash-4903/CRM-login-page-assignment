const { ZodError } = require('zod');

function validateRequest(schema, source = 'body') {
  return (req, res, next) => {
    try {
      schema.parse(req[source]);
      next();
    } catch (err) {
      if (err instanceof ZodError) {
        const errors = {};
        for (const issue of err.issues) {
          const field = issue.path.join('.');
          if (!errors[field]) {
            errors[field] = issue.message;
          }
        }
        return res.status(400).json({
          success: false,
          message: 'Validation failed',
          errors,
        });
      }
      next(err);
    }
  };
}

module.exports = validateRequest;