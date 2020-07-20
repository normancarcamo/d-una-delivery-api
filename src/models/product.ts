import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';

export const Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  legend: {
    type: String
  },
  photo: {
    type: String
  }
}, { strict: false });

Schema.plugin(mongoosePaginate);

export const Model = mongoose.model('Product', Schema);

export default Model;
