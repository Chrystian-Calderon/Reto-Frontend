import { getConnection } from './Connection.js';
import data from './data.json';

export const crearTablaJugador = async () => {
  try {
    const db = await getConnection();
    await db.execAsync(
      `CREATE TABLE IF NOT EXISTS jugador (
        id INTEGER PRIMARY KEY,
        nombre VARCHAR(150) NOT NULL,
        posicion VARCHAR(20),
        nroCamiseta INTEGER,
        edad INTEGER,
        equipoID INTEGER,
        FOREIGN KEY (equipoID) REFERENCES equipo(id)
      )`
    );
  } catch (e) {
    console.error('Error al crear tabla jugador');
  }
};

export const insertarJugadores = async () => {
  const db = await getConnection();
  const rows = await db.getAllAsync('SELECT * FROM jugador');
  if (rows.length <= 0) {
    const jugadorData = data.jugadores;
    for (let jugador of jugadorData) {
      db.runAsync(
        'INSERT INTO jugador (nombre, posicion, nroCamiseta, edad, equipoID) VALUES (?, ?, ?, ?, ?);',
        [jugador.nombre, jugador.posicion, jugador.nroCamiseta, jugador.edad, jugador.equipoID]);
    }
  }
}

export const getJugadores = async () => {
  const db = await getConnection();
  const rows = await db.getAllAsync('SELECT * FROM jugador');
  return rows;
}

export const getJugadorId = async (id) => {
  const db = await getConnection();
  const row = await db.getAllAsync('SELECT * FROM jugador WHERE id = ?', [id]);
  return row;
}

export const getJugadoresEquipo = async (equipoID) => {
  const db = await getConnection();
  const rows = await db.getAllAsync('SELECT * FROM jugador WHERE equipoID = ?', [equipoID]);
  return rows;
}

export const addJugador = async (jugador) => {
  const db = await getConnection();
  const result = await db.runAsync(
    'INSERT INTO jugador (nombre, posicion, nroCamiseta, edad, equipoID) VALUES (?, ?, ?, ?, ?);',
    [jugador.nombre, jugador.posicion, jugador.nroCamiseta, jugador.edad, jugador.equipoID]);
  return result.lastInsertRowId;
}