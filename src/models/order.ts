import faker from 'faker';
import mongoose from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { Schema as ProductSchema } from './product';
import { Schema as UserSchema } from './user';
import { Schema as CustomerSchema } from './customer';
import { Schema as ProviderSchema } from './provider';

export const Schema = new mongoose.Schema({
  code: {
    type: String,
    minlength: 5,
    maxlength: 20
  },
  user: UserSchema,
  customer: CustomerSchema,
  provider: ProviderSchema,
  products: [ ProductSchema ],
  status: {
    type: String,
    enum : [
      'canceled',
      'delivering',
      'delivered',
      'pending',
      'pickedUp',
      'pickingUp'
    ],
    default: 'pending',
    required: true
  },
  comments: [{
    type: String
  }],
  timestamp: {
    createdAt: {
      type: Date,
      required: true,
      default: Date.now
    },
    pickedAt: {
      type: Date
    },
    deliveredAt: {
      type: Date
    },
    canceledAt: {
      type: Date
    }
  },
}, { strict: false });

Schema.plugin(mongoosePaginate);

Schema.virtual('id').get(function(this: { _id: any }) {
  return this._id;
});

// Schema.methods.generateCode = function() {
//   return faker.finance.account();
// };

// Schema.pre('save', function() {
//   console.log('pre.save...')
//   // this.set({ code: faker.finance.account() });
// });

export const Model = mongoose.model('Order', Schema);

export default Model;
