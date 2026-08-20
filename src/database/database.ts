import * as SQLite from 'expo-sqlite';
import { CREATE_BARBERS_TABLE } from './schema';

let databasePromise: Promise<SQLite.SQLiteDatabase> | null = null;

export function getDatabase(): Promise<SQLite.SQLiteDatabase> {
  if (!databasePromise) {
    databasePromise = initializeDatabase();
  }

  return databasePromise;
}

async function initializeDatabase(): Promise<SQLite.SQLiteDatabase> {
  const db = await SQLite.openDatabaseAsync('barber_scheduler.db');

  await db.execAsync(CREATE_BARBERS_TABLE);

  return db;
}