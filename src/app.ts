import cors from 'cors';
import compression from 'compression';
import express, { Application } from 'express';
import helmet from 'helmet';
import morgan from 'morgan';
import router from './router';
import * as middlewares from './middlewares';

const app: Application = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(compression());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));
app.use(router);
app.use(middlewares.notFound);
app.use(middlewares.error);

export default app;
