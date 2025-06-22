import { getConnection } from './Connection.js';
import data from './data.json';

export const crearTablaPartido = async () => {
  try {
    const db = await getConnection();
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS partido (
        id INTEGER PRIMARY KEY,
        fecha DATE,
        equipo_local INTEGER,
        equipo_visitante INTEGER,
        resultado_local INTEGER(2),
        resultado_visitante INTEGER(2),
        FOREIGN KEY (equipo_local) REFERENCES equipo(id),
        FOREIGN KEY (equipo_visitante) REFERENCES equipo(id)
        )`);
  } catch (e) {
    console.error('Error al crear tabla partido');
  }
}

export const insertarPartidos = async () => {
  const db = await getConnection();
  const rows = await db.getAllAsync('SELECT * FROM partido');
  if (rows.length <= 0) {
    const partidosData = data.partidos;
    for (let partido of partidosData) {
      await db.runAsync(
        'INSERT INTO partido (fecha, equipo_local, equipo_visitante, resultado_local, resultado_visitante) VALUES (?, ?, ?, ?, ?)',
        [partido.fecha, partido.equipo_local, partido.equipo_visitante, partido.resultado_local, partido.resultado_visitante]);
    }
  }
}

export const getPartidos = async () => {
  const db = await getConnection();
  const rows = await db.getAllAsync(`
    SELECT 
      p.id,
      p.fecha,
      el.nombre AS equipo_local,
      ev.nombre AS equipo_visitante,
      p.resultado_local,
      p.resultado_visitante
    FROM partido p
    JOIN equipo el ON p.equipo_local = el.id
    JOIN equipo ev ON p.equipo_visitante = ev.id
    ORDER BY p.fecha DESC
  `);
  return rows;
}

export const getPartidoId = async (id) => {
  const db = await getConnection();
  const row = await db.getAllAsync('SELECT * FROM partido WHERE id = ?', [id]);
  return row;
}

export const addPartido = async (partido) => {
  const db = await getConnection();
  const fecha = new Date().toISOString().split('T')[0];
  const result = await db.runAsync(
    'INSERT INTO partido (fecha, equipo_local, equipo_visitante, resultado_local, resultado_visitante) VALUES (?, ?, ?, ?, ?)',
    [fecha, partido.equipo_local, partido.equipo_visitante, partido.resultado_local, partido.resultado_visitante]);
  return result.lastInsertRowId;
}