import mysql from 'mysql2';
import { getClientId } from '../utils/transactionContext'; // ajusta ruta relativa

// Reemplaza la variable global por un Map
const connections = new Map<string, mysql.Connection>();

function createConn() {
  return mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Roberto@ldo1',
    database: 'ht3_transactions',
  });
}

function ensureConn(): mysql.Connection {
  const clientId = getClientId();
  let conn = connections.get(clientId) || null;
  if (!conn) {
    conn = createConn();
    connections.set(clientId, conn);
  }
  return conn;
}

function getConnOrThrow(): mysql.Connection {
  const clientId = getClientId();
  const conn = connections.get(clientId) || null;
  if (!conn) throw Object.assign(new Error('Transacción no iniciada'), { code: 'NO_TX' });
  return conn;
}

function releaseConn() {
  const clientId = getClientId();
  const conn = connections.get(clientId) || null;
  if (conn) {
    conn.end();
    connections.delete(clientId);
  }
}

// ===== Tus mismas funciones, sólo sustituyendo 'connection' por helpers =====

export const iniciarTransaccion = (callback: (err: mysql.QueryError | null) => void) => {
  const conn = ensureConn();
  conn.beginTransaction((err) => {
    if (err) {
      console.error('Error al iniciar transacción:', err);
      return callback(err);
    }
    console.log('Transacción iniciada correctamente');
    callback(null);
  });
};

export const insertarUsuario = (
  nombre: string,
  apellido: string,
  callback: (err: mysql.QueryError | null) => void
) => {
  let conn: mysql.Connection;
  try { conn = getConnOrThrow(); } catch (e) { return callback(e as mysql.QueryError); }
  const query = 'INSERT INTO users (nombre, apellido) VALUES (?, ?)';
  console.log(`Usuario Guardado Temporalmente ${nombre}, ${apellido}`);
  conn.query(query, [nombre, apellido], callback);
};

export const getUsers = (
  callback: (err: mysql.QueryError | null, results?: any) => void
) => {
  // intenta usar la conexión de la transacción actual (si existe)
  try {
    const conn = getConnOrThrow(); // tu helper que lanza 'NO_TX' si no hay transacción
    const query = 'SELECT * FROM users';
    console.log('Usuarios mostrados temporalmente (dentro de TX)');
    return conn.query(query, callback);
  } catch (e: any) {
    // si NO hay transacción, hacemos una lectura fuera de TX con una conexión temporal
    if (e && e.code === 'NO_TX') {
      const tmp = createConn();
      const query = 'SELECT * FROM users';
      console.log('Usuarios mostrados (fuera de TX, fallback)');
      return tmp.query(query, (err, rows) => {
        tmp.end();
        callback(err, rows);
      });
    }
    // otros errores sí se propagan
    return callback(e);
  }
};

export const updateUser = (
  id: number,
  nombre: string,
  apellido: string,
  callback: (err: mysql.QueryError | null, results?: any) => void
) => {
  let conn: mysql.Connection;
  try { conn = getConnOrThrow(); } catch (e) { return callback(e as mysql.QueryError); }
  const query = 'UPDATE users SET nombre = ?, apellido = ? WHERE id = ?';
  console.log(`Usuario con id ${id} actualizado temporalmente`);
  conn.query(query, [nombre, apellido, id], callback);
};

export const deleteUser = (
  id: number,
  callback: (err: mysql.QueryError | null, results?: any) => void
) => {
  let conn: mysql.Connection;
  try { conn = getConnOrThrow(); } catch (e) { return callback(e as mysql.QueryError); }
  const query = 'DELETE FROM users WHERE id = ?';
  console.log(`Usuario con id ${id} eliminado temporalmente`);
  conn.query(query, [id], callback);
};

export const commitTransaccion = (callback: (err: mysql.QueryError | null) => void) => {
  let conn: mysql.Connection;
  try { conn = getConnOrThrow(); } catch (e) { return callback(e as mysql.QueryError); }
  conn.commit((err) => {
    console.log('Commit finalizado correctamente');
    releaseConn(); // libera sólo la conexión de ESTE cliente
    callback(err || null);
  });
};

export const setIsolationLevel = (
  nivel: string,
  callback: (err: mysql.QueryError | null) => void
) => {
  // Sugerencia: aplicarlo antes de BEGIN, en la misma sesión
  const conn = ensureConn();
  const query = `SET SESSION TRANSACTION ISOLATION LEVEL ${nivel}`;
  conn.query(query, (err) => {
    if (err) {
      console.error('Error al cambiar nivel de aislamiento:', err);
      return callback(err);
    }
    console.log(`Nivel de aislamiento cambiado a ${nivel}`);
    callback(null);
  });
};

export const rollbackTransaccion = (callback: () => void) => {
  const clientId = getClientId();
  const conn = connections.get(clientId) || null;
  if (!conn) return callback();
  conn.rollback(() => {
    console.log('Rollback finalizado correctamente');
    releaseConn(); // libera sólo la conexión de ESTE cliente
    callback();
  });
};
