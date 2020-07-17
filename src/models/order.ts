import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { Schema as ProductSchema } from './product';

export const Schema = new mongoose.Schema({
  code: {
    type: mongoose.Schema.Types.String,
    minlength: 5,
    maxlength: 20,
  },
  user_id: mongoose.Schema.Types.ObjectId,
  customer_id: mongoose.Schema.Types.ObjectId,
  provider_id: mongoose.Schema.Types.ObjectId,
  products: [ ProductSchema ],
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
    pickedAt: {
      type: mongoose.Schema.Types.Date
    },
    deliveredAt: {
      type: mongoose.Schema.Types.Date
    },
    canceledAt: {
      type: mongoose.Schema.Types.Date
    }
  },
}, { strict: false });

Schema.plugin(mongoosePaginate);

export const Model = mongoose.model('Order', Schema);

export default Model;
