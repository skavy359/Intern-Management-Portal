const internService = require('../services/intern.service');
const { successResponse, errorResponse } = require('../utils/response');

async function checkHealth(req, res) {
  return successResponse(res, 200, 'Intern API is healthy');
}

async function getAllInterns(req, res, next) {
  try {
    const limit = req.query.limit !== undefined ? Number(req.query.limit) : 20;
    const offset = req.query.offset !== undefined ? Number(req.query.offset) : 0;

    const includeDisabled = req.user && req.user.role === 'Admin' && req.query.all === 'true';

    let result;
    if (includeDisabled) {
      result = await internService.getAllInternsAdmin({ limit, offset });
    } else {
      result = await internService.getAllInterns({ limit, offset });
    }

    return successResponse(res, 200, 'Interns retrieved successfully', {
      interns: result.interns,
      pagination: result.pagination
    });
  } catch (error) {
    next(error);
  }
}

async function getInternById(req, res, next) {
  try {
    const id = Number(req.params.id);
    const intern = await internService.getInternById(id);

    if (!intern) {
      return errorResponse(res, 404, 'Intern not found');
    }

    return successResponse(res, 200, 'Intern retrieved successfully', intern);
  } catch (error) {
    next(error);
  }
}

async function createIntern(req, res, next) {
  try {
    const newIntern = await internService.createIntern(req.body);
    return successResponse(res, 201, 'Intern created successfully', newIntern);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return errorResponse(res, 409, 'Email already exists');
    }
    next(error);
  }
}

async function updateIntern(req, res, next) {
  try {
    const id = Number(req.params.id);
    const updatedIntern = await internService.updateIntern(id, req.body);

    if (!updatedIntern) {
      return errorResponse(res, 404, 'Intern not found');
    }

    return successResponse(res, 200, 'Intern updated successfully', updatedIntern);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return errorResponse(res, 409, 'Email already exists');
    }
    next(error);
  }
}

async function disableIntern(req, res, next) {
  try {
    const id = Number(req.params.id);
    const result = await internService.disableIntern(id);

    if (!result.found) {
      return errorResponse(res, 404, result.message);
    }

    return successResponse(res, 200, result.message);
  } catch (error) {
    next(error);
  }
}

async function enableIntern(req, res, next) {
  try {
    const id = Number(req.params.id);
    const result = await internService.enableIntern(id);

    if (!result.found) {
      return errorResponse(res, 404, result.message);
    }

    return successResponse(res, 200, result.message);
  } catch (error) {
    next(error);
  }
}

async function searchInterns(req, res, next) {
  try {
    const keyword = req.query.keyword;

    if (!keyword || keyword.trim().length === 0) {
      return errorResponse(res, 400, 'Search keyword is required');
    }

    const limit = req.query.limit !== undefined ? Number(req.query.limit) : 20;
    const offset = req.query.offset !== undefined ? Number(req.query.offset) : 0;

    const result = await internService.searchInterns(keyword.trim(), { limit, offset });

    return successResponse(res, 200, 'Search results retrieved', {
      interns: result.interns,
      keyword: keyword.trim(),
      count: result.interns.length,
      pagination: result.pagination
    });
  } catch (error) {
    next(error);
  }
}

async function updateProfile(req, res, next) {
  try {
    const id = req.user.id;
    const { name, email } = req.body;

    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      return errorResponse(res, 400, 'Name is required');
    }

    if (!email || typeof email !== 'string') {
      return errorResponse(res, 400, 'Email is required');
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return errorResponse(res, 400, 'Invalid email format');
    }

    const updated = await internService.updateProfile(id, { name, email });

    if (!updated) {
      return errorResponse(res, 404, 'Profile not found');
    }

    return successResponse(res, 200, 'Profile updated successfully', updated);
  } catch (error) {
    if (error.code === 'ER_DUP_ENTRY') {
      return errorResponse(res, 409, 'Email already exists');
    }
    next(error);
  }
}

async function changePassword(req, res, next) {
  try {
    const id = req.user.id;
    const { currentPassword, newPassword } = req.body;

    if (!currentPassword || !newPassword) {
      return errorResponse(res, 400, 'Current password and new password are required');
    }

    if (newPassword.length < 6) {
      return errorResponse(res, 400, 'New password must be at least 6 characters');
    }

    const result = await internService.changePassword(id, currentPassword, newPassword);

    if (!result.success) {
      return errorResponse(res, 400, result.message);
    }

    return successResponse(res, 200, result.message);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  checkHealth,
  getAllInterns,
  getInternById,
  createIntern,
  updateIntern,
  disableIntern,
  enableIntern,
  searchInterns,
  updateProfile,
  changePassword
};
