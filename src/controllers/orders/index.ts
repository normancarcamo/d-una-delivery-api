import startOfMonth from 'date-fns/startOfMonth';
import endOfMonth from 'date-fns/endOfMonth';
import startOfDay from 'date-fns/startOfDay';
import endOfDay from 'date-fns/endOfDay';
import express, { Request, Response, NextFunction } from 'express';
import _ from 'lodash';
import Order from '../../models/order';
import faker from 'faker';
import * as Models from '../../models';
import createHttpError from 'http-errors';

const router = express.Router();

router.get('/', async (
  req: Request & { [key: string]: any },
  res: Response,
  next: NextFunction,
) => {
  try {
    const now = new Date();

    const latest = await Order.paginate({
      'user._id': req.user._id,
      'timestamp.createdAt': {
        $gte: startOfDay(now),
        $lte: endOfDay(now)
      },
      'status': { $ne: 'pending' },
    }, { limit: 100, sort: { 'timestamp.createdAt': 'desc' } });

    const lastMonth = await Order.paginate({
      'user._id': req.user._id,
      'timestamp.createdAt': {
        $gte: startOfMonth(now),
        $lte: endOfMonth(now),
        $not: {
          $gte: startOfDay(now),
          $lte: endOfDay(now)
        },
      },
    }, { limit: 100, sort: { 'timestamp.createdAt': 'desc' } });

    const historic = await Order.paginate({
      'user._id': req.user._id,
      'timestamp.createdAt': {
        $not: {
          $gte: startOfMonth(now),
          $lte: endOfMonth(now)
        },
      },
    }, { limit: 100, sort: { 'timestamp.createdAt': 'desc' } });

    historic.totalDocs += (lastMonth.totalDocs + latest.totalDocs);

    res.send({ latest, lastMonth, historic });
  } catch (error) {
    next(error);
  }
});

router.post('/', async (
  req: Request & { user? : any; },
  res: Response,
  next: NextFunction
) => {
  try {
    const now = new Date();
    const pending = await Order.findOne({
      'user._id': req.user._id,
      'timestamp.createdAt': {
        $gte: startOfDay(now),
        $lte: endOfDay(now)
      },
      'status': 'pending',
    });

    if (pending) {
      throw new createHttpError.Conflict(
        `The user cannot have more than 1 pending order.`
      );
    }

    const code = faker.random.uuid().substring(0, 10);
    const comments = _.times(_.random(5), () => faker.lorem.sentence());

    // Get user:
    const user = req.user;

    // Get Customer:
    const _customersList = await Models.Customer.Model.find({}, { item: 1 });
    const _customersMap = _customersList.map(customer => customer._id);
    const _customerId = _customersMap[_.random(0, _customersMap.length -1)];
    const _customer = await Models.Customer.Model.findById(_customerId);
    const customer = _customer.toJSON();

    // Get Provider:
    const _providersList = await Models.Provider.Model.find({}, { item: 1 });
    const _providersMap = _providersList.map(provider => provider._id);
    const _providerId = _providersMap[_.random(0, _providersMap.length -1)];
    const _provider = await Models.Provider.Model.findById(_providerId);
    const provider = _provider.toJSON();

    // Get Products from the selected provider:
    const products = _.take(
      provider.products,
      _.random(1, provider.products.length -1)
    );
    provider.products = [];

    const order = await Models.Order.Model.create({
      code,
      comments,
      user,
      customer,
      provider,
      products
    });

    res.send(order);
  } catch (error) {
    next(error);
  }
});

router.get('/pending', async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction,
) => {
  try {
    const Order = Models.Order.Model;
    const now = new Date();
    const results = await Order.findOne({
      'user._id': req.user._id,
      'timestamp.createdAt': {
        $gte: startOfDay(now),
        $lte: endOfDay(now)
      },
      'status': 'pending',
    });
    res.send(results);
  } catch (error) {
    next(error);
  }
});

router.patch('/:order', async (
  req: Request & { user?: any },
  res: Response,
  next: NextFunction,
) => {
  try {
    const Order = Models.Order.Model;
    const filter = { _id: req.params.order };
    const update = { status: req.query.status };
    const options = { new: true };
    const order = await Order.findOneAndUpdate(filter, update, options);
    res.send(order);
  } catch (error) {
    next(error);
  }
});

export default router;
