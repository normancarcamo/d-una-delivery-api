import cors from 'cors';
import bodyParser from 'body-parser';
import express, { Application } from 'express';
import helmet from 'helmet';
import router from './router';
import * as middlewares from './middlewares';

const app: Application = express();

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: true, credentials: true }));
app.use(router);
app.use(middlewares.notFound);
app.use(middlewares.error);

export default app;
