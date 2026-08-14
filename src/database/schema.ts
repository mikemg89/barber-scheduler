export const schema = `
CREATE TABLE IF NOT EXISTS Barbers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  specialty TEXT NOT NULL
);
`;