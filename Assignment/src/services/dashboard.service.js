const dashboardRepo = require('../repositories/dashboard.repository');

async function getDashboardStats() {
  const stats = await dashboardRepo.getStats();
  const roleDistribution = await dashboardRepo.getRoleDistribution();
  const recentInterns = await dashboardRepo.getRecentInterns(5);

  return {
    stats,
    roleDistribution,
    recentInterns
  };
}

module.exports = { getDashboardStats };
