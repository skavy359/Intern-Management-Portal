const dashboardService = require('../services/dashboard.service');
const { successResponse } = require('../utils/response');

async function getDashboardStats(req, res, next) {
  try {
    const data = await dashboardService.getDashboardStats();
    return successResponse(res, 200, 'Dashboard data retrieved', data);
  } catch (error) {
    next(error);
  }
}

module.exports = { getDashboardStats };
