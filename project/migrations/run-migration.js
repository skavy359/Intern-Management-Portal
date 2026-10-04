require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const fs = require('fs');
const path = require('path');
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'backend_training',
  waitForConnections: true,
  connectionLimit: 2,
  queueLimit: 0,
  multipleStatements: true
}).promise();

async function runMigration() {
  try {
    console.log('Running migration...');

    const [columns] = await pool.execute(
      `SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_SCHEMA = ? AND TABLE_NAME = 'interns' AND COLUMN_NAME = 'password_hash'`,
      [process.env.DB_NAME || 'backend_training']
    );

    if (columns.length > 0) {
      console.log('Column password_hash already exists. Skipping migration.');
    } else {
      const sql = fs.readFileSync(path.join(__dirname, '001_add_auth_fields.sql'), 'utf8');
      const statements = sql.split(';').filter(s => s.trim() && !s.trim().startsWith('--'));
      for (const stmt of statements) {
        if (stmt.trim()) {
          await pool.execute(stmt.trim());
        }
      }
      console.log('Migration complete: password_hash column added.');
    }

    process.exit(0);
  } catch (error) {
    console.error('Migration error:', error.message);
    process.exit(1);
  }
}

runMigration();