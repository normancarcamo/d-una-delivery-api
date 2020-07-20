import faker from 'faker';
import _ from 'lodash';
import * as types from './types';
import * as utils from './utils';
import { ObjectId } from 'mongodb';

export const mock = async ({ max, models }: {
  max?: number;
  models: {
    products: types.Product[];
  }
}) => {
  const MAX_PROVIDERS = max || 30;
  const photos = await utils.getPhotos({
    term: 'restaurant',
    debug: 'provider',
    per_page: MAX_PROVIDERS
  });

  const providers: Array<types.Provider> = [];
  const _products = _.chunk(
    models.products,
    Math.floor(models.products.length / MAX_PROVIDERS)
  );

  for (let i = 0; i < MAX_PROVIDERS; i++) {
    providers.push({
      _id: new ObjectId(),
      name: faker.company.companyName(),
      address: {
        latitude: +faker.address.latitude(),
        streetAddress: faker.address.streetAddress(),
        longitude: +faker.address.longitude()
      },
      timetable: function () {
        const _min = [ '00', '30', '45' ];
        const _init = _.range(7, 12);
        const _end = _.range(16, 23);
        const _from = _init[_.random(4)];
        const _to = _end[_.random(4)];
        return {
          from: `${_from < 10 ? '0' : ''}${_from}:${_min[_.random(2)]}`,
          to: `${_to}:${_min[_.random(2)]}`
        };
      } (),
      phone: faker.phone.phoneNumber(),
      photo: photos[i],
      products: _products[i],
    });
  }

  return providers;
}
