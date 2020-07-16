import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import authController from './controllers/auth/auth';
import * as seedController from './controllers/seed';
import { notAllowed, validateToken } from './middlewares';

const router = express.Router();

router.use(validateToken(jsonwebtoken))

router.use('/auth', authController);

router.route('/ping').all((req, res) => res.send('pong'));

router.route('/seed').post(seedController.seed).all(notAllowed);

export default router;
