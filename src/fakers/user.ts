import faker from 'faker';
import * as types from './types';

const MAX_USERS = 30;

export const mock = async () => {
  const users: Array<types.User> = [];

  for (let i = 0; i < MAX_USERS; i++) {
    users.push({
      name: {
        first: faker.name.firstName(),
        last: faker.name.lastName()
      },
      email: faker.internet.email(),
      password: faker.internet.password(),
      phone: faker.phone.phoneNumber(),
      photo: faker.internet.avatar(),
      address: {
        latitude: +faker.address.latitude(),
        streetAddress: faker.address.streetAddress(),
        longitude: +faker.address.longitude()
      }
    });
  }

  return users;
}
