import sqlite3 from 'sqlite3';
import path from 'path';
import { open, Database } from 'sqlite';

sqlite3.verbose();

export type Todo = {
  id: number;
  title: string;
  completed: number; // 0 or 1
};

let dbPromise: Promise<Database<sqlite3.Database, sqlite3.Statement>> | null = null;

export function getDb() {
  if (!dbPromise) {
    const dbPath = path.join(process.cwd(), 'server', 'data.sqlite');
    dbPromise = open({ filename: dbPath, driver: sqlite3.Database });
  }
  return dbPromise;
}

export async function migrate() {
  const db = await getDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS todos (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      completed INTEGER NOT NULL DEFAULT 0
    );
  `);
}


