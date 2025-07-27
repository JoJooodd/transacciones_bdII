import { db } from '../models/db';
import mysql from 'mysql2';

export const insertarTransaccion = (
    nombre: string,
    apellido: string,
    callback: (err: mysql.QueryError | null, result?: any) => void
): void => {
    const query = 'INSERT INTO users (nombre, apellido) VALUES (?, ?)';
    db.query(query, [nombre, apellido], callback);
};
