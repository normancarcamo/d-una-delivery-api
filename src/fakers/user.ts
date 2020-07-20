import faker from 'faker';
import * as types from './types';
import { ObjectId } from 'mongodb';

export const mock = async ({ max }: { max?: 30 }) => {
  const MAX_USERS = max || 30;
  const users: Array<types.User> = [];

  for (let i = 0; i < MAX_USERS; i++) {
    users.push({
      _id: new ObjectId(),
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
