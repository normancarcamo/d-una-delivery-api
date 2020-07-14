export type User = {
  id?: string;
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
  _id?: string;
  name: string;
  phone: string;
  address: {
    latitude: number;
    streetAddress: string;
    longitude: number;
  };
}

export type Product = {
  id?: string;
  name: string;
  legend: string;
  photo: string;
}

export type Provider = {
  id?: string;
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

export type Order = {
  id?: string;
  code: string;
  user: User;
  customer: Customer;
  provider: Omit<Provider, 'products'>;
  products: Array<Product>;
  status: Status;
  comments: Array<string>;
  timestamp: {
    createdAt: string;
    startedAt?: string | null;
    pickedUpAt?: string | null;
    deliveredAt?: string | null;
  };
}
