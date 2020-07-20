import faker from 'faker';
import * as types from './types';
import { ObjectId } from 'mongodb';

export const mock = async ({ max }: { max?: number }) => {
  const MAX_CUSTOMERS = max || 600;
  const customers: Array<types.Customer> = [];

  for (let i = 0; i < MAX_CUSTOMERS; i++) {
    customers.push({
      _id: new ObjectId(),
      name: faker.name.findName(),
      phone: faker.phone.phoneNumber(),
      address: {
        latitude: +faker.address.latitude(),
        streetAddress: faker.address.streetAddress(),
        longitude: +faker.address.longitude()
      }
    });
  }

  return customers;
}
