import { ObjectId } from 'mongodb';

export type User = {
  _id: ObjectId;
  name: {
    first: string;
    last: string;
  };
  email: string;
  password: string;
  phone: string;
  photo: string;
  address: {
    latitude: number;
    streetAddress: string;
    longitude: number;
  };
}

export type Customer = {
  _id: ObjectId;
  name: string;
  phone: string;
  address: {
    latitude: number;
    streetAddress: string;
    longitude: number;
  };
}

export type Product = {
  _id: ObjectId;
  name: string;
  legend: string;
  photo: string;
}

export type Provider = {
  _id: ObjectId;
  name: string;
  address: {
    latitude: number;
    streetAddress: string;
    longitude: number;
  };
  timetable: {
    from: string;
    to: string;
  };
  phone: string;
  photo: string;
  products: Array<Product>;
}

export type Status =
  'canceled'
| 'delivering'
| 'delivered'
| 'pending'
| 'pickedUp';

export type Timestamp = {
  createdAt: string;
  startedAt?: string;
  pickedAt?: string;
  deliveredAt?: string;
  canceledAt?: string;
}

export type Order = {
  _id: ObjectId;
  code: string;
  user: User;
  customer: Customer;
  provider: Omit<Provider, 'products'>;
  products: Array<Product>;
  status: Status;
  comments: Array<string>;
  timestamp: Timestamp;
}
