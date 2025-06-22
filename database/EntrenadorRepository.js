import { getConnection } from './Connection.js';
import data from './data.json';

export const crearTablaEntrenador = async () => {
  try {
    const db = await getConnection();
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS entrenador (
        id INTEGER PRIMARY KEY,
        nombre VARCHAR(150),
        edad INTEGER,
        estrategia VARCHAR(100)
      )`);
  } catch (e) {
    console.error('Error al crear tabla entrenador');
  }
}

export const insertarEntrenadores = async () => {
  const db = await getConnection();
  const rows = await db.getAllAsync('SELECT * FROM entrenador');
  if (rows.length <= 0) {
    const entrenadoresData = data.entrenadores;
    for (let entrenador of entrenadoresData) {
      await db.runAsync(
        'INSERT INTO entrenador (nombre, edad, estrategia) VALUES (?, ?, ?)',
        [entrenador.nombre, entrenador.edad, entrenador.estrategia]);
    }
  }
};

export const getEntrenadores = async () => {
  const db = await getConnection();
  const rows = await db.getAllAsync('SELECT * FROM entrenador');
  return rows;
};

export const getEntrenadoresSinEquipo = async () => {
  const db = await getConnection();
  const rows = await db.getAllAsync(`
    SELECT e.*
    FROM entrenador e
    LEFT JOIN equipo eq ON e.id = eq.entrenadorID
    WHERE eq.entrenadorID IS NULL
  `);
  return rows;
}

export const getEntrenadorId = async (id) => {
  const db = await getConnection();
  const row = await db.getAll('SELECT * FROM entrenador WHERE id = ?', [id]);
  return row;
}