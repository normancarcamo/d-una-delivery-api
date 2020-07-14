import mongoose from 'mongoose';
import { Schema as SchemaProduct } from './product';

export const Schema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  address: {
    streetAddress: {
      type: mongoose.Schema.Types.String,
      required: true
    },
    latitude: {
      type: mongoose.Schema.Types.Number,
      required: true
    },
    longitude: {
      type: mongoose.Schema.Types.Number,
      required: true
    }
  },
  timetable: {
    from: {
      type: mongoose.Schema.Types.String,
      default: '08:00'
    },
    to: {
      type: mongoose.Schema.Types.String,
      default: '17:00'
    },
  },
  phone: {
    type: mongoose.Schema.Types.String
  },
  photo: {
    type: mongoose.Schema.Types.String
  },
  products: [SchemaProduct]
}, { strict: false });

export const Model = mongoose.model('Provider', Schema);

export default Model;
