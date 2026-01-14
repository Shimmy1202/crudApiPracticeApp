import Database from "better-sqlite3";

// Keep the SQLite file in the backend root (mounted by docker-compose).
const db = new Database("db.sqlite");

// Simple "migration" on startup.
db.exec(`
  CREATE TABLE IF NOT EXISTS memos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    created_at TEXT NOT NULL,
    updated_at TEXT NOT NULL
  )
`);

export default db;
