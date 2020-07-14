import mongoose from 'mongoose';

export const Schema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  phone: {
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
  }
}, { strict: false });

export const Model = mongoose.model('Customer', Schema);

export default Model;
