import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export const Schema = new mongoose.Schema({
  name: {
    first: {
      type: String,
      required: true,
    },
    last: {
      type: String,
      required: true
    },
  },
  email: {
    type: String,
    lowercase: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  photo: {
    type: String
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
  }
}, { strict: false });

Schema.plugin(mongoosePaginate);

export const Model = mongoose.model('User', Schema);

export default Model;
