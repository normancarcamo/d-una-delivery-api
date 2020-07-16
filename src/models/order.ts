import mongoose from 'mongoose';
import { Schema as SchemaCustomer } from './customer';
import { Schema as SchemaProduct } from './product';
import { Schema as SchemaProvider } from './provider';
import { Schema as SchemaUser } from './user';

export const Schema = new mongoose.Schema({
  code: {
    type: mongoose.Schema.Types.String,
    minlength: 5,
    maxlength: 20,
  },
  user: SchemaUser,
  customer: SchemaCustomer,
  provider: SchemaProvider,
  products: [ SchemaProduct ],
  status: {
    type: mongoose.Schema.Types.String,
    enum : [
      'canceled',
      'delivering',
      'delivered',
      'pending',
      'pickedUp'
    ],
    default: 'pending',
    required: true
  },
  comments: [{
    type: mongoose.Schema.Types.String
  }],
  timestamp: {
    createdAt: {
      type: mongoose.Schema.Types.Date,
      required: true,
      default: Date.now
    },
    startedAt: {
      type: mongoose.Schema.Types.Date
    },
    pickedUpAt: {
      type: mongoose.Schema.Types.Date
    },
    deliveredAt: {
      type: mongoose.Schema.Types.Date
    }
  },
}, { strict: false });

export const Model = mongoose.model('Order', Schema);

export default Model;
