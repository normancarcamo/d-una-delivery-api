import { add, formatISO, sub } from 'date-fns';
import faker from 'faker';
import _ from 'lodash';
import { ObjectId } from 'mongodb';
import * as types from './types';

export const mock = async ({ max, models } : {
  max?: number;
  models: {
    users: Array<types.User>;
    customers: Array<types.Customer>;
    providers: Array<types.Provider>;
  };
}) => {
  const MAX_ORDERS = max || 500;
  const { users, customers, providers } = models;
  const status: Array<types.Status> = [
    'canceled',
    'delivering',
    'delivered',
    'pending',
    'pickedUp',
  ];
  const orders: Array<types.Order> = [];

  for (let i = 0; i < MAX_ORDERS; i++) {
    const _provider = providers[_.random(providers.length -1)];
    const _status = status[_.random(status.length -1)];
    const user = users[_.random(users.length -1)];
    const customer = customers[_.random(customers.length -1)];
    const provider = _.omit(_provider, 'products');
    const products = _.take(
      _provider.products,
      _.random(_provider.products.length -1),
    );

    orders.push({
      _id: new ObjectId(),
      code : faker.random.uuid().substring(0, 10),
      user: user,
      customer: customer,
      provider: provider,
      products: products,
      status: _status,
      comments: _.times(_.random(5), () => faker.lorem.sentence()),
      timestamp: function () {
        const now = sub(new Date(), { minutes: _.random(30) });
        const old = sub(now, { months: _.random(5) });
        const createdAt = faker.date.between(old, now);
        const startedAt = add(createdAt, { minutes: _.random(20) });
        const pickedAt = add(startedAt, { minutes: _.random(20) });
        const deliveredAt = add(pickedAt, { minutes: _.random(20) });
        const _timestamp: types.Timestamp = {
          createdAt: formatISO(createdAt)
        };

        if (_status !== 'canceled') {
          _timestamp.startedAt = [formatISO(startedAt)][_.random(1)];
          _timestamp.pickedAt = [formatISO(pickedAt)][_.random(1)];
          _timestamp.deliveredAt = [formatISO(deliveredAt)][_.random(1)];
          _timestamp.canceledAt = [formatISO(new Date())][_.random(1)];
        }

        return _timestamp;
      } ()
    });
  }

  return orders;
}
