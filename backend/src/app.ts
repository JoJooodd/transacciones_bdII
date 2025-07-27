import express from 'express';
import cors from 'cors';
import transaccionRoutes from './routes/transactionRoutes';

const app = express();
const PORT = 3000;

// Permite recibir JSON y peticiones desde otro puerto (como React)

app.use(cors());
app.use(express.json());

// Usa las rutas de transacción
app.use('/api', transaccionRoutes);

// Inicia el servidor
app.listen(PORT, () => {
    console.log(`🚀 Servidor backend corriendo en puerto ${PORT}`);
});
