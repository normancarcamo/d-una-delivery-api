import faker from 'faker';
import _ from 'lodash';
import * as types from './types';
import * as utils from './utils';
import { ObjectId } from 'mongodb';

const MAX_PRODUCTS = 500;
const PHOTOS_PER_PAGE = 100;
const PHOTOS_PAGES = Math.ceil(MAX_PRODUCTS / PHOTOS_PER_PAGE);

export const mock = async () => {
  const results: Array<Promise<Array<string>>> = [];

  for (let i = 1; i <= PHOTOS_PAGES; i++) {
    results.push(utils.getPhotos({
      debug: 'product',
      term: 'fast food',
      page: i,
      per_page: PHOTOS_PER_PAGE
    }));
  }

  const photos: Array<string> = _.flattenDeep(await Promise.all(results));

  const products: Array<types.Product> = [];

  for (let i = 0; i < MAX_PRODUCTS; i++) {
    products.push({
      _id: new ObjectId(),
      name: faker.commerce.productAdjective(),
      legend: faker.commerce.productName(),
      photo: photos[i]
    });
  }

  return products;
}
