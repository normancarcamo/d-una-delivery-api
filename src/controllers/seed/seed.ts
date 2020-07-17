import { Request, Response, NextFunction } from 'express';
import Customer from '../../models/customer';
import Order from '../../models/order';
import Provider from '../../models/provider';
import User from '../../models/user';
import * as fakers from '../../fakers';
import * as utils from '../../fakers/utils';

export const seed = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const users = await fakers.user.mock();
    const customers = await fakers.customer.mock();
    const products = await fakers.product.mock();
    const providers = await fakers.provider.mock({ products });
    const orders = await fakers.order.mock({
      models: { customers, providers, users }
    });

    if (!req.body.merge) {
      await User.deleteMany({});
      await Customer.deleteMany({});
      await Provider.deleteMany({});
      await Order.deleteMany({});
    }

    await User.bulkWrite(users.map(user => ({
      insertOne: { document: user }
    })));

    await Customer.bulkWrite(customers.map(customer => ({
      insertOne: { document: customer }
    })));

    await Provider.bulkWrite(providers.map(provider => ({
      insertOne: { document: provider }
    })));

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
    const customers = await fakers.customer.mock();
    const products = await fakers.product.mock();
    const providers = await fakers.provider.mock({ products });
    const orders = await fakers.order.mock({
      max: 260,
      models: { customers, providers, users }
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
