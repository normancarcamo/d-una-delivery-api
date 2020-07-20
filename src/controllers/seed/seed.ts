import { Request, Response, NextFunction } from 'express';
import Customer from '../../models/customer';
import Order from '../../models/order';
import Provider from '../../models/provider';
import User from '../../models/user';
import * as fakers from '../../fakers';
import * as utils from '../../fakers/utils';
import _ from 'lodash';

export const seed = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    if (!req.body.merge) {
      await User.deleteMany({});
      await Customer.deleteMany({});
      await Provider.deleteMany({});
      await Order.deleteMany({});
    }

    const users = await fakers.user.mock({});

    await User.bulkWrite(users.map(user => ({
      insertOne: { document: user }
    })));

    const customers = await fakers.customer.mock({});

    await Customer.bulkWrite(customers.map(customer => ({
      insertOne: { document: customer }
    })));

    const products = await fakers.product.mock({});
    const providers = await fakers.provider.mock({ models: { products } });

    await Provider.bulkWrite(providers.map(provider => ({
      insertOne: { document: provider }
    })));

    const orders = await fakers.order.mock({
      models: { customers, providers, users }
    });

    await Order.bulkWrite(orders.map(order => ({
      insertOne: { document: order }
    })));

    if (req.body.files) {
      utils.writeFile({ data: users, key: 'users' });
      utils.writeFile({ data: customers, key: 'customers' });
      utils.writeFile({ data: providers, key: 'providers' });
      utils.writeFile({ data: orders, key: 'orders' });
    }

    res.json({ message: 'ok!' });
  } catch (error) {
    next(error);
  }
}

export const seedUser = async (
  req: Request & { [key: string]: any },
  res: Response,
  next: NextFunction
) => {
  try {
    const users = [req.user.toJSON()];
    const customers = await fakers.customer.mock({});
    const products = await fakers.product.mock({});
    const providers = await fakers.provider.mock({ models: { products } });

    const orders = await fakers.order.mock({
      max: req.body.max || 100,
      models: { customers, providers, users },
      status: _.defaultTo(
        [ 'delivered', 'canceled' ],
        Array.isArray(req.body.status)
          && req.body.status.length
          && req.body.status
      )
    });
    await Order.bulkWrite(orders.map(order => ({
      insertOne: { document: order }
    })));
    utils.writeFile({ data: orders, key: req.user._id });
    res.send({ message: 'ok' });
  } catch (error) {
    next(error);
  }
}

export default seed;
