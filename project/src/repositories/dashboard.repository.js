const pool = require('../db/connection');

async function getStats() {
  const [totalRows] = await pool.execute('SELECT COUNT(*) as total FROM interns');
  const [activeRows] = await pool.execute('SELECT COUNT(*) as total FROM interns WHERE is_enabled = TRUE');
  const [disabledRows] = await pool.execute('SELECT COUNT(*) as total FROM interns WHERE is_enabled = FALSE');

  return {
    total: totalRows[0].total,
    active: activeRows[0].total,
    disabled: disabledRows[0].total
  };
}

async function getRoleDistribution() {
  const [rows] = await pool.execute(
    'SELECT role, COUNT(*) as count FROM interns WHERE is_enabled = TRUE GROUP BY role ORDER BY count DESC'
  );
  return rows;
}

async function getRecentInterns(limit = 5) {
  const [rows] = await pool.query(
    'SELECT id, name, email, role, is_enabled, created_at FROM interns ORDER BY created_at DESC LIMIT ?',
    [limit]
  );
  return rows;
}

module.exports = { getStats, getRoleDistribution, getRecentInterns };
