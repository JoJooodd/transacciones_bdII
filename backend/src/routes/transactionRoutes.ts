import { Router } from 'express';
import {
    iniciar,
    insertar,
    confirmar,
    cancelar
} from '../controllers/transactionController';

const router = Router();

router.post('/transaccion/iniciar', iniciar);
router.post('/transaccion/insertar', insertar);
router.post('/transaccion/commit', confirmar);
router.post('/transaccion/rollback', cancelar);

export default router;