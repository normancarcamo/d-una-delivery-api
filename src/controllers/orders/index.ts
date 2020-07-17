import express, { Request, Response, NextFunction } from 'express';
import Order from '../../models/order';

const router = express.Router();

router.get('/', async (
  req: Request & { [key: string]: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const orders = await Order.paginate({ "user_id": req.user._id }, {});
    res.send(orders);
  } catch (error) {
    next(error);
  }
});

export default router;
