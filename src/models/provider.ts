import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { Schema as SchemaProduct } from './product';

export const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  address: {
    streetAddress: {
      type: String,
      required: true
    },
    latitude: {
      type: Number,
      required: true
    },
    longitude: {
      type: Number,
      required: true
    }
  },
  timetable: {
    from: {
      type: String,
      default: '08:00'
    },
    to: {
      type: String,
      default: '17:00'
    },
  },
  phone: {
    type: String
  },
  photo: {
    type: String
  },
  products: [SchemaProduct]
}, { strict: false });

Schema.plugin(mongoosePaginate);

export const Model = mongoose.model('Provider', Schema);

export default Model;
