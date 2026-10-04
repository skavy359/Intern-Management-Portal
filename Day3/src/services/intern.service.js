const pool = require("../db/connection");

function healthCheck(req, res) {
    res.status(200).json({ message: "API is healthy" });
}

async function getInternById(internId) {
    const [rows] = await pool.query("SELECT * FROM interns WHERE id = ?", [internId]);

    return rows[0] || null;
}

module.exports = {
    healthCheck,
    getInternById,
};