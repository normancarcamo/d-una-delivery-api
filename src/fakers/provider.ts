import faker from 'faker';
import _ from 'lodash';
import * as types from './types';
import * as utils from './utils';

const MAX_PROVIDERS = 12;

export const mock = async ({ products }: { products: types.Product[]; }) => {
  const photos = await utils.getPhotos({
    term: 'restaurant',
    debug: 'provider',
    per_page: MAX_PROVIDERS
  });

  const providers: Array<types.Provider> = [];

  for (let i = 0; i < MAX_PROVIDERS; i++) {
    providers.push({
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
      products: _.take(products, Math.floor(products.length / MAX_PROVIDERS))
    });
  }

  return providers;
}
