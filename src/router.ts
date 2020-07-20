import express from 'express';
import jsonwebtoken from 'jsonwebtoken';
import authController from './controllers/auth/auth';
import * as seedController from './controllers/seed/seed';
import { notAllowed, validateToken } from './middlewares';
import ordersController from './controllers/orders';

const router = express.Router();

router.route('/ping').all((req, res) => res.send('pong'));
router.use(validateToken(jsonwebtoken));
router.use('/auth', authController);
router.use('/orders', ordersController);
router.route('/seed').post(seedController.seed).all(notAllowed);
router.route('/seed/user').post(seedController.seedUser).all(notAllowed);

export default router;
