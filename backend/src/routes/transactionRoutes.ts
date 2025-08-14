import { Router } from 'express';
import {
    iniciar,
    insertar,
    confirmar,
    obtenerUsuarios,
    actualizarUsuario,
    eliminarUsuario,
    changeIsolationLevel,
    cancelar
} from '../controllers/transactionController';

const router = Router();

router.post('/transaccion/iniciar', iniciar);
router.post('/transaccion/insertar', insertar);
router.post('/transaccion/commit', confirmar);
router.post('/transaccion/rollback', cancelar);


// crud

router.get('/transaccion/getUsers', obtenerUsuarios); // select users
router.put('/transaccion/updateUser', actualizarUsuario); // update especific user
router.delete('/transaccion/deleteUser/:id', eliminarUsuario); // delete especific user

// niveles aislamiento

router.post('/transaccion/isolation', changeIsolationLevel);

export default router;