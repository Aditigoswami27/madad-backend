import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const db = new pg.Client({
    user: process.env.PG_USER,
    host:process.env.PG_HOST,
    database: process.env.PG_DATABASE,
    password: process.env.PG_PASSWORD,
    port:process.env.PG_PORT
});

db.connect()
  .then(()=>console.log("Connected to database"))
  .catch((err)=> console.log("DB connection error:", err));

export default db;
