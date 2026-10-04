require("dotenv").config();

const required = [
    "DB_HOST",
    "DB_USER",
    // "DB_PASSWORD",
    "DB_NAME"
];

for (const key of required) {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
}

const env = {
    port: Number(process.env.PORT) || 3000,

    db: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT) || 3306,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME
    }
};

module.exports = env;