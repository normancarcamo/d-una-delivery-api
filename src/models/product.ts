import mongoose from 'mongoose';

export const Schema = new mongoose.Schema({
  name: {
    type: mongoose.Schema.Types.String,
    required: true
  },
  legend: {
    type: mongoose.Schema.Types.String
  },
  photo: {
    type: mongoose.Schema.Types.String
  }
}, { strict: false });

export const Model = mongoose.model('Product', Schema);

export default Model;
