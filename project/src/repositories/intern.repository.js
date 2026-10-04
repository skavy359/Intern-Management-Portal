const pool = require('../db/connection');

async function findAll({ limit, offset }) {
  const [rows] = await pool.query(
    'SELECT id, name, email, role, is_enabled, created_at FROM interns WHERE is_enabled = TRUE ORDER BY id ASC LIMIT ? OFFSET ?',
    [limit, offset]
  );
  return rows;
}

async function findAllIncludingDisabled({ limit, offset }) {
  const [rows] = await pool.query(
    'SELECT id, name, email, role, is_enabled, created_at FROM interns ORDER BY id ASC LIMIT ? OFFSET ?',
    [limit, offset]
  );
  return rows;
}

async function findById(id) {
  const [rows] = await pool.execute(
    'SELECT id, name, email, role, is_enabled, created_at FROM interns WHERE id = ?',
    [id]
  );
  return rows[0] || null;
}

async function findActiveById(id) {
  const [rows] = await pool.execute(
    'SELECT id, name, email, role, is_enabled, created_at FROM interns WHERE is_enabled = TRUE AND id = ?',
    [id]
  );
  return rows[0] || null;
}

async function create(intern) {
  const { name, email, role, password_hash } = intern;
  const [result] = await pool.execute(
    'INSERT INTO interns (name, email, role, password_hash) VALUES (?, ?, ?, ?)',
    [name, email, role, password_hash]
  );
  return result.insertId;
}

async function update(id, intern) {
  const { name, email, role } = intern;
  const [result] = await pool.execute(
    'UPDATE interns SET name = ?, email = ?, role = ? WHERE id = ?',
    [name, email, role, id]
  );
  return result;
}

async function disable(id) {
  const [result] = await pool.execute(
    'UPDATE interns SET is_enabled = FALSE WHERE id = ? AND is_enabled = TRUE',
    [id]
  );
  return result;
}

async function enable(id) {
  const [result] = await pool.execute(
    'UPDATE interns SET is_enabled = TRUE WHERE id = ? AND is_enabled = FALSE',
    [id]
  );
  return result;
}

async function search(keyword, { limit, offset }) {
  const sanitizedKeyword = `%${keyword}%`;
  const [rows] = await pool.query(
    'SELECT id, name, email, role, is_enabled, created_at FROM interns WHERE is_enabled = TRUE AND (name LIKE ? OR email LIKE ? OR role LIKE ?) ORDER BY id ASC LIMIT ? OFFSET ?',
    [sanitizedKeyword, sanitizedKeyword, sanitizedKeyword, limit, offset]
  );
  return rows;
}

async function countSearch(keyword) {
  const sanitizedKeyword = `%${keyword}%`;
  const [rows] = await pool.execute(
    'SELECT COUNT(*) AS total FROM interns WHERE is_enabled = TRUE AND (name LIKE ? OR email LIKE ? OR role LIKE ?)',
    [sanitizedKeyword, sanitizedKeyword, sanitizedKeyword]
  );
  return rows[0].total;
}

async function countAll() {
  const [rows] = await pool.execute('SELECT COUNT(*) as total FROM interns');
  return rows[0].total;
}

async function countActive() {
  const [rows] = await pool.execute('SELECT COUNT(*) as total FROM interns WHERE is_enabled = TRUE');
  return rows[0].total;
}

async function countDisabled() {
  const [rows] = await pool.execute('SELECT COUNT(*) as total FROM interns WHERE is_enabled = FALSE');
  return rows[0].total;
}

async function countByRole() {
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

async function updateProfile(id, data) {
  const { name, email } = data;
  const [result] = await pool.execute(
    'UPDATE interns SET name = ?, email = ? WHERE id = ?',
    [name, email, id]
  );
  return result;
}

async function updatePassword(id, passwordHash) {
  const [result] = await pool.execute(
    'UPDATE interns SET password_hash = ? WHERE id = ?',
    [passwordHash, id]
  );
  return result;
}

module.exports = {
  findAll,
  findAllIncludingDisabled,
  findById,
  findActiveById,
  create,
  update,
  disable,
  enable,
  search,
  countSearch,
  countAll,
  countActive,
  countDisabled,
  countByRole,
  getRecentInterns,
  updateProfile,
  updatePassword
};
