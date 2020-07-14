import axios from 'axios';
import fs from 'fs';
import * as types from './types';

fs.mkdirSync(`${process.cwd()}/files`, { recursive: true });

type WriteFile = (options: {
  data: Array<types.User
    | types.Customer
    | types.Product
    | types.Order
    | types.Provider>;
  key: string;
  log?: boolean;
}) => void;

export const writeFile: WriteFile = ({ data, key, log }) => {
  const output = `${process.cwd()}/files/${key}.json`;
  fs.writeFileSync(output, JSON.stringify(data, null, 2), { flag: 'w+' });
  if (log) {
    console.log(`${key}.json ok.`);
  }
};

type GetPhotos = (options: {
  term: string;
  per_page?: number;
  page?: number;
  debug: string;
}) => Promise<Array<string>>;

export const getPhotos: GetPhotos = async (options) => {
  try {
    const params = new URLSearchParams({
      key: `${process.env.PIXABAY_API_KEY}`,
      page: `${options.page || 1}`,
      per_page: `${options.per_page || 20}`,
      q: options.term || ''
    });
    const res = await axios.get(`https://pixabay.com/api/?${params}`);
    return res.data.hits.map((hit: any) => hit.largeImageURL);
  } catch (error) {
    console.error(`${error.response.data} - ${options.debug}`);
    return [];
  }
}
