require('dotenv').config({ path: require('path').join(__dirname, '..', '.env') });
const bcrypt = require('bcryptjs');
const mysql = require('mysql2');

const pool = mysql.createPool({
  host: process.env.DB_HOST || 'localhost',
  port: Number(process.env.DB_PORT) || 3306,
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'backend_training',
  waitForConnections: true,
  connectionLimit: 2,
  queueLimit: 0
}).promise();

async function seed() {
  try {
    console.log('Starting database seed...');
    console.log('Connected to database:', process.env.DB_NAME || 'backend_training');

    const adminPassword = await bcrypt.hash('Admin@123', 10);
    const internPassword = await bcrypt.hash('Intern@123', 10);

    await pool.execute(
      'UPDATE interns SET password_hash = ?, role = ? WHERE id = ?',
      [adminPassword, 'Admin', 1]
    );
    console.log('Updated intern id=1 (Kavy) → Admin role with password');

    await pool.execute(
      'UPDATE interns SET password_hash = ? WHERE id = ?',
      [internPassword, 2]
    );
    console.log('Updated intern id=2 (Rahul) → password set');

    await pool.execute(
      'UPDATE interns SET password_hash = ? WHERE id IN (?, ?)',
      [internPassword, 3, 4]
    );
    console.log('Updated intern id=3,4 → passwords set');

    const roles = [
      'Backend Intern',
      'Frontend Intern',
      'Web Developer',
      'QA Intern',
      'DevOps Intern',
      'UI/UX Intern',
      'Data Intern'
    ];
    const [countRows] = await pool.execute('SELECT COUNT(*) AS total FROM interns');
    const existingCount = Number(countRows[0].total);
    const targetCount = 100;

    if (existingCount < targetCount) {
      const remaining = targetCount - existingCount;
      const [lastIdRows] = await pool.execute('SELECT COALESCE(MAX(id), 0) AS lastId FROM interns');
      const startNumber = Number(lastIdRows[0].lastId) + 1;

      for (let index = 0; index < remaining; index += 1) {
        const sequence = startNumber + index;
        await pool.execute(
          'INSERT INTO interns (name, email, role, password_hash, is_enabled) VALUES (?, ?, ?, ?, TRUE)',
          [
            `Demo Intern ${sequence}`,
            `demo.intern.${sequence}@example.com`,
            roles[index % roles.length],
            internPassword
          ]
        );
      }
      console.log(`Added ${remaining} demo interns.`);
    } else {
      console.log(`Database already contains ${existingCount} interns; no demo interns added.`);
    }

    const [finalCountRows] = await pool.execute('SELECT COUNT(*) AS total FROM interns');
    console.log(`Total interns: ${finalCountRows[0].total}`);

    console.log('\n--- Seed Complete ---');
    console.log('Admin login:  kavy@example.com / Admin@123');
    console.log('Intern login: rahul@example.com / Intern@123');
    console.log('');

    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error.message);
    process.exit(1);
  }
}

seed();