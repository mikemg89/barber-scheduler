import * as SQLite from 'expo-sqlite';
import { schema } from './schema';

export const db = SQLite.openDatabaseSync('barber.db');

export const initializeDatabase = () => {
  db.execSync(schema);
};