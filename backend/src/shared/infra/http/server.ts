import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import routes from '@shared/infra/http/router';
import '@shared/infra/typeorm';
import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import Cors from 'cors';

const app = express();
app.use(Cors());
app.use(express.json());
const port = '3333';
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);

app.use((err: Error, req: Request, res: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'internal server error',
  });
});

app.listen(port, () => {
  console.log('🚀 starting server node in port 3333');
});
