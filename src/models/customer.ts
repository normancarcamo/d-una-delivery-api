import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
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
  }
}, { strict: false });

Schema.plugin(mongoosePaginate);

export const Model = mongoose.model('Customer', Schema);

export default Model;
