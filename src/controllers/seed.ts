import { Request, Response } from 'express';
import Customer from '../models/customer';
import Order from '../models/order';
import Provider from '../models/provider';
import User from '../models/user';
import * as fakers from '../fakers';
import * as utils from '../fakers/utils';

export const seed = async (req: Request, res: Response) => {
  const users = await fakers.user.mock();
  const customers = await fakers.customer.mock();
  const products = await fakers.product.mock();
  const providers = await fakers.provider.mock({ products });
  const orders = await fakers.order.mock({ customers, providers, users });

  if (req.body.files) {
    utils.writeFile({ data: users, key: 'users' });
    utils.writeFile({ data: customers, key: 'customers' });
    utils.writeFile({ data: providers, key: 'providers' });
    utils.writeFile({ data: orders, key: 'orders' });
  }

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

  res.json({ message: 'ok!' });
}

export default seed;
