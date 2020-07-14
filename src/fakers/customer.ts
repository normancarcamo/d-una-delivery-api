import faker from 'faker';
import * as types from './types';

const MAX_CUSTOMERS = 600;

export const mock = async () => {
  const customers: Array<types.Customer> = [];

  for (let i = 0; i < MAX_CUSTOMERS; i++) {
    customers.push({
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
