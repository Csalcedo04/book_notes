import pg from "pg";
import env from "dotenv";
env.config();
const db = new pg.Client({
    user: process.env.user,
    host: process.env.host,
    database: process.env.database,
    password: process.env.password,
    port: process.env.port,
})
db.connect();

export default db;