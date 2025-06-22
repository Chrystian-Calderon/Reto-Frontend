import { getConnection } from './Connection.js';
import data from './data.json';

export const crearTablaEquipo = async () => {
  try {
    const db = await getConnection();
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS equipo (
        id INTEGER PRIMARY KEY,
        nombre VARCHAR(100) NOT NULL,
        entrenadorID INTEGER,
        FOREIGN KEY (entrenadorID) REFERENCES entrenador(id)
      )`);
  } catch (e) {
    console.error('Error al crear tabla equipo', e);
  }
}

export const insertarEquipos = async () => {
  const db = await getConnection();
  const rows = await db.getAllAsync('SELECT * FROM equipo');
  if (rows.length <= 0) {
    const equiposData = data.equipos;
    for (let equipo of equiposData) {
      await db.runAsync(
        'INSERT INTO equipo (nombre, entrenadorID) VALUES (?, ?)',
        [equipo.nombre, equipo.entrenadorID]);
    }
  }
}

export const getEquipos = async () => {
  const db = await getConnection();
  const rows = await db.getAllAsync('SELECT * FROM equipo');
  return rows;
}

export const getEquipoId = async (id) => {
  const db = await getConnection();
  const row = await db.getAllAsync('SELECT e.id, e.nombre, en.nombre AS entrenador, en.estrategia FROM equipo e JOIN entrenador en ON e.entrenadorID = en.id WHERE e.id = ?', [id]);
  return row;
}

export const rankingEquipos = async () => {
  const db = await getConnection();
  const rows = await db.getAllAsync(`
    SELECT
      e.id,
      e.nombre,
      (
        SELECT COUNT(*)
        FROM partido p1
        WHERE p1.equipo_local = e.id AND p1.resultado_local > p1.resultado_visitante
      ) +
      (
        SELECT COUNT(*)
        FROM partido p2
        WHERE p2.equipo_visitante = e.id AND p2.resultado_visitante > p2.resultado_local
      ) AS partidos_ganados
    FROM equipo e
    JOIN partido p ON e.id = p.equipo_local OR e.id = p.equipo_visitante
    GROUP BY e.id
    ORDER BY partidos_ganados DESC
  `);
  return rows;
}

export const getEquiposPartidos = async (id) => {
  const db = await getConnection();
  const rows = await db.getAllAsync(`
    SELECT
      p.id,
      p.fecha,
      e.nombre AS equipo,
      ev.nombre AS contrincante,
      p.resultado_local,
      p.resultado_visitante
    FROM partido p
    JOIN equipo e ON p.equipo_local = e.id
    JOIN equipo ev ON p.equipo_visitante = ev.id
    WHERE e.id = ?

    UNION ALL

    SELECT
      p.id,
      p.fecha,
      e.nombre AS equipo,
      ev.nombre AS contrincante,
      p.resultado_local,
      p.resultado_visitante
    FROM partido p
    JOIN equipo e ON p.equipo_visitante = e.id
    JOIN equipo ev ON p.equipo_local = ev.id
    WHERE e.id = ?
  `, [id]);
  console.log(rows);
  return rows;
}