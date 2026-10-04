const authService = require('../services/auth.service');
const { successResponse, errorResponse } = require('../utils/response');

async function login(req, res, next) {
  try {
    const { email, password } = req.body;
    const result = await authService.login(email.trim().toLowerCase(), password);

    if (!result.success) {
      return errorResponse(res, 401, result.message);
    }

    return successResponse(res, 200, 'Login successful', {
      token: result.token,
      user: result.user
    });
  } catch (error) {
    next(error);
  }
}

async function getMe(req, res, next) {
  try {
    const internRepo = require('../repositories/intern.repository');
    const user = await internRepo.findById(req.user.id);

    if (!user) {
      return errorResponse(res, 404, 'User not found');
    }

    return successResponse(res, 200, 'Profile retrieved', user);
  } catch (error) {
    next(error);
  }
}

module.exports = { login, getMe };
