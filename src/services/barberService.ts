import { getDatabase } from '../database/database';
import { Barber } from '../models/types';

export async function getBarbers(): Promise<Barber[]> {
  const db = await getDatabase();

  const barbers = await db.getAllAsync<Barber>(
    `
      SELECT id, name, specialty, isActive
      FROM Barbers
      WHERE isActive = 1
      ORDER BY name ASC;
    `,
  );

  return barbers;
}

export async function seedBarbers(): Promise<void> {
  const db = await getDatabase();

  const result = await db.getFirstAsync<{ count: number }>(
    `SELECT COUNT(*) as count FROM Barbers;`,
  );

  if (result && result.count > 0) {
    return;
  }

  await db.runAsync(
    `
      INSERT INTO Barbers (name, specialty, isActive)
      VALUES (?, ?, ?);
    `,
    'Carlos Gómez',
    'Classic Haircuts',
    1,
  );

  await db.runAsync(
    `
      INSERT INTO Barbers (name, specialty, isActive)
      VALUES (?, ?, ?);
    `,
    'Miguel Rodríguez',
    'Beard Specialist',
    1,
  );

  await db.runAsync(
    `
      INSERT INTO Barbers (name, specialty, isActive)
      VALUES (?, ?, ?);
    `,
    'David Pérez',
    'Modern Styles',
    1,
  );
}