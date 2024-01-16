import bodyParser from 'body-parser';
import express, { Request, Response } from 'express';






const app = express();
app.use(bodyParser.json({ limit: '10mb' }));

app.use(express.json());

app.get('/', (_req: Request, res: Response) => {
    res.send('Hello World!');
})


const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});