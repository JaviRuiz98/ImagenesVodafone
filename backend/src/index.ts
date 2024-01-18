import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import cors from 'cors';

import tiendaRoutes from './routes/tiendasRoutes';
import imagesRoutes from './routes/imagenesRoutes';
import procesamientoRoutes from './routes/procesamientoRoutes';


const app = express();
app.use(bodyParser.json({ limit: '10mb' }));

app.use(express.json());
app.use(cors());

app.use('/', tiendaRoutes);
app.use('/', imagesRoutes);
app.use('/', procesamientoRoutes);

app.get('/', (_req: Request, res: Response) => {
    res.send('Hello World! prueba 1');
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});