import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import express, { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import Order from '../../models/order';

const router = express.Router();

router.get('/', async (
  req: Request & { [key: string]: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await Order.paginate({
      "user_id": req.user._id,
    }, { limit: 300, sort: { 'timestamp.createdAt': 'desc' } });
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

router.get('/stats', async (
  req: Request & { [key: string]: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const user = req.user.toJSON();
    const date = new Date();

    const historic = await Order.paginate({
      "user_id": req.user._id,
    }, { limit: 100, sort: { 'timestamp.createdAt': 'desc' } });

    const lastMonth = await Order.paginate({
      "user_id": user._id,
      "timestamp.createdAt": {
        $gte: startOfMonth(date),
        $lte: endOfMonth(date)
      },
    }, { limit: 100, sort: { 'timestamp.createdAt': 'desc' } });

    const latest = await Order.paginate({
      "user_id": user._id,
      "timestamp.createdAt": {
        $gte: startOfDay(date),
        $lte: endOfDay(date)
      },
    }, { limit: 100, sort: { 'timestamp.createdAt': 'desc' },  });

    res.send({ historic, lastMonth, latest });
  } catch (error) {
    next(error);
  }
});

export default router;
