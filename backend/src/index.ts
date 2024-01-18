import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';
import cors from 'cors';


const app = express();
app.use(bodyParser.json({ limit: '10mb' }));

app.use(express.json());
app.use(cors());

app.get('/', (_req: Request, res: Response) => {
    res.send('Hello World!');
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});