const pool = require('../db/connection');

async function findByEmail(email) {
  const [rows] = await pool.execute(
    'SELECT id, name, email, role, password_hash, is_enabled, created_at FROM interns WHERE email = ?',
    [email]
  );
  return rows[0] || null;
}

module.exports = { findByEmail };
