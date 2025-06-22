import { crearTablaEntrenador, insertarEntrenadores } from './EntrenadorRepository.js';
import { crearTablaJugador, insertarJugadores } from './JugadorRepository.js';
import { crearTablaEquipo, insertarEquipos } from './EquipoRepository.js';
import { crearTablaPartido, insertarPartidos } from './PartidoRepository.js';

export default function startDB() {
  crearTablaEntrenador();
  crearTablaEquipo();
  crearTablaJugador();
  crearTablaPartido();

  insertarEntrenadores();
  insertarEquipos();
  insertarJugadores();
  insertarPartidos();
}