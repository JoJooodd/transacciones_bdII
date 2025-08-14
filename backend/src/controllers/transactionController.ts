import { Request, Response } from 'express';
import {
    iniciarTransaccion,
    insertarUsuario,
    commitTransaccion,
    rollbackTransaccion,
    getUsers,
    setIsolationLevel,
    updateUser,
    deleteUser
} from '../models/transactionSession';

export const iniciar = (_: Request, res: Response) => {
    iniciarTransaccion((err) => {
        if (err) return res.status(500).json({ error: 'Error al iniciar transacción' });
        res.json({ message: 'Transacción iniciada' });
    });
};

export const insertar = (req: Request, res: Response) => {
    const { nombre, apellido } = req.body;

    insertarUsuario(nombre, apellido, (err) => {
    if (err) {
        console.error('Error al insertar usuario:', err); 
        return res.status(500).json({ error: 'Error al insertar' });
    }
    res.json({ message: 'Usuario insertado (sin confirmar)' });
    });
};

export const changeIsolationLevel = (req: Request, res: Response) => {
    const { nivel } = req.body;

    setIsolationLevel(nivel, (err) => {
        if (err) {
            return res.status(500).json({ error: 'No se pudo cambiar el nivel de aislamiento' });
        }
        res.status(200).json({ mensaje: `Nivel de aislamiento cambiado a ${nivel}` });
    });
};

export const obtenerUsuarios = (_req: Request, res: Response) => {
    getUsers((err, results) => {
        if (err) {
            console.log(err)
            return res.status(500).json({ error: 'Error al obtener usuarios' });
        }
        res.status(200).json(results);
    });
};

export const actualizarUsuario = (req: Request, res: Response) => {
    const {id, nombre, apellido } = req.body;
    
    updateUser(id, nombre, apellido, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al actualizar usuario' });
        }
        res.status(200).json(results);
    });
};

export const eliminarUsuario = (req: Request, res: Response) => {
    const id = Number(req.params.id);

    deleteUser(id, (err, results) => {
        if (err) {
            return res.status(500).json({ error: 'Error al eliminar usuario' });
        }
        res.status(200).json(results);
    });
};

export const confirmar = (_: Request, res: Response) => {
    commitTransaccion((err) => {
        if (err) return res.status(500).json({ error: 'Error al confirmar transacción' });
        res.json({ message: 'Transacción confirmada' });
    });
};

export const cancelar = (_: Request, res: Response) => {
    rollbackTransaccion(() => {
        res.json({ message: 'Transacción cancelada' });
    });
};