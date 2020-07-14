import express from 'express';
import { notAllowed } from './middlewares';
import * as controller from './controllers/seed';

const router = express.Router();

router.route('/ping').all((req, res) => res.send('pong'));

router.route('/seed').get(controller.seed).all(notAllowed);

export default router;
