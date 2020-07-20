import { add, formatISO, sub } from 'date-fns';
import faker from 'faker';
import _ from 'lodash';
import { ObjectId } from 'mongodb';
import * as types from './types';

export const mock = async ({ max, models, status } : {
  max?: number;
  models: {
    users: Array<types.User>;
    customers: Array<types.Customer>;
    providers: Array<types.Provider>;
  };
  status?: Array<types.Status>;
}) => {
  const MAX_ORDERS = max || 500;
  const { users, customers, providers } = models;
  const statuses = status ?? [ 'canceled', 'delivered' ];
  const orders: Array<types.Order> = [];

  for (let i = 0; i < MAX_ORDERS; i++) {
    const _provider = providers[_.random(providers.length -1)];
    const statusSelected = statuses[_.random(statuses.length -1)];

    orders.push({
      _id: new ObjectId(),
      code : faker.random.uuid().substring(0, 10),
      user: users[_.random(users.length -1)],
      customer: customers[_.random(customers.length -1)],
      provider: _.omit(_provider, 'products'),
      products: _.take(
        _provider.products,
        _.random(1, _provider.products.length -1)
      ),
      status: statusSelected,
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

        if (statusSelected === 'canceled') {
          _timestamp.canceledAt = formatISO(new Date());
        } else if (statusSelected === 'pickedUp') {
          _timestamp.pickedAt = [formatISO(pickedAt)][_.random(1)];
        } else if (statusSelected === 'delivered') {
          _timestamp.deliveredAt = [formatISO(deliveredAt)][_.random(1)];
        }

        return _timestamp;
      } ()
    });
  }

  return orders;
}
