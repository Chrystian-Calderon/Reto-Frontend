import * as SQLite from 'expo-sqlite';

export const getConnection = async () => {
  try {
    const db = await SQLite.openDatabaseAsync('futbolDB');
    await db.execAsync('PRAGMA foreign_keys = ON');
    return db;
  } catch (e) {
    console.error("Error al crear base de datos:", e);
    return null;
  }
}