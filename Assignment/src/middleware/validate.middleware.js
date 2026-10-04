const { errorResponse } = require('../utils/response');

function validate(validatorFn) {
  return (req, res, next) => {
    const result = validatorFn(req.body, req.params, req.query);
    if (!result.valid) {
      return errorResponse(res, 400, result.message);
    }
    next();
  };
}

module.exports = validate;
