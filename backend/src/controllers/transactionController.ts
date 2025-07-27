import { Request, Response } from 'express';
import {
    iniciarTransaccion,
    insertarUsuario,
    commitTransaccion,
    rollbackTransaccion
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