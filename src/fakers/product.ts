import faker from 'faker';
import _ from 'lodash';
import * as types from './types';
import * as utils from './utils';
import { ObjectId } from 'mongodb';

export const mock = async ({ max }: { max?: number; }) => {
  const MAX_PRODUCTS = max || 500;
  const PHOTOS_PER_PAGE = 100;
  const PHOTOS_PAGES = Math.ceil(MAX_PRODUCTS / PHOTOS_PER_PAGE);

  const results: Array<Promise<Array<string>>> = [];

  for (let i = 1; i <= PHOTOS_PAGES; i++) {
    results.push(utils.getPhotos({
      debug: 'product',
      term: 'food',
      page: i,
      per_page: PHOTOS_PER_PAGE
    }));
  }

  const photos: Array<string> = _.flattenDeep(await Promise.all(results));

  const products: Array<types.Product> = [];

  for (let i = 0; i < MAX_PRODUCTS; i++) {
    products.push({
      _id: new ObjectId(),
      name: faker.random.words(),
      legend: faker.commerce.productName(),
      photo: photos[i]
    });
  }

  return products;
}
