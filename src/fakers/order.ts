import { add, formatISO, sub } from 'date-fns';
import faker from 'faker';
import _ from 'lodash';
import * as types from './types';

const MAX_ORDERS = 500;

export const mock = async ({ users, customers, providers } : {
  users: Array<types.User>;
  customers: Array<types.Customer>;
  providers: Array<types.Provider>;
}) => {
  const provider = providers[_.random(providers.length) || 0];
  const status: Array<types.Status> = [
    'canceled',
    'delivering',
    'delivered',
    'pending',
    'pickedUp'
  ];
  const orders: Array<types.Order> = [];

  for (let i = 0; i < MAX_ORDERS; i++) {
    orders.push({
      code : faker.random.uuid().substring(0, 10),
      user: users[_.random(users.length)],
      customer: customers[_.random(customers.length)],
      provider: _.omit(provider, 'products'),
      products: _.take(provider.products, _.random(provider.products.length)),
      status: status[_.random(status.length)],
      comments: _.times(_.random(5), () => faker.lorem.sentence()),
      timestamp: function () {
        const now = sub(new Date(), { minutes: _.random(30) });
        const old = sub(now, { months: _.random(5) });
        const createdAt = faker.date.between(old, now);
        const startedAt = add(createdAt, { minutes: _.random(20) });
        const pickedUpAt = add(startedAt, { minutes: _.random(20) });
        const deliveredAt = add(pickedUpAt, { minutes: _.random(20) });
        return {
          createdAt: formatISO(createdAt),
          startedAt: [null, formatISO(startedAt)][_.random(2)],
          pickedUpAt: [null, formatISO(pickedUpAt)][_.random(2)],
          deliveredAt: [null, formatISO(deliveredAt)][_.random(2)]
        };
      } ()
    });
  }

  return orders;
}
