import mongoose from 'mongoose';

export const Schema = new mongoose.Schema({
  name: {
    first: {
      type: mongoose.Schema.Types.String,
      required: true,
    },
    last: {
      type: mongoose.Schema.Types.String,
      required: true
    },
  },
  email: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  password: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  phone: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  photo: {
    type: mongoose.Schema.Types.String
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

export const Model = mongoose.model('User', Schema);

export default Model;
