import express from 'express';
import cors from 'cors';
import transaccionRoutes from './routes/transactionRoutes';
import { runWithClientId } from './utils/transactionContext';

const app = express();
const PORT = 8000;

// Permite recibir JSON y peticiones desde otro puerto (como React)

app.use(cors());
app.use(express.json());

// Usa las rutas de transacción
app.use((req, res, next) => {
    const hdr = req.header('X-Client-Id');
    const clientId = hdr && hdr.trim() ? hdr.trim() : `${req.ip}-${Date.now()}-${Math.random()}`;
    runWithClientId(clientId, () => next());
});

app.use('/api', transaccionRoutes); 

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en puerto ${PORT}`);
});
