const PORT = process.env.PORT || 3000;
// 60 seg * 60 min * 24hrs * 30 days;
const TIME_TOKEN = process.env.TIME_TOKEN || 60 * 60 * 24 * 30;
const SEED = process.env.SEED || "este-es-el-seed-desarrollo";

const development = {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DATABASE || "social-network-dev",
    host: process.env.DB_URL || "localhost",
    dialect: process.env.DIALECT || "mysql",
};
const test = {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DATABASE || "social-network-test",
    host: process.env.DB_URL || "localhost",
    dialect: process.env.DIALECT || "mysql",
};
const production = {
    username: process.env.DB_USERNAME || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DATABASE || "social-network",
    host: process.env.DB_URL || "localhost",
    dialect: process.env.DIALECT || "mysql",
};
module.exports = {
    PORT,
    TIME_TOKEN,
    SEED,
    development,
    test,
    production
};
