import * as mongoose from 'mongoose';
const Schema = mongoose.Schema;
import { variables } from '../config/variables';

const orderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  type: {
    type: String
  },
  disabled: {
    type: Boolean,
    default: false
  },
  slices: [
    {
      sliceNumber: Number,
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ],
  items: [
    {
      name: String,
      price: Number,
      user: {
        type: Schema.Types.ObjectId,
        ref: 'User'
      }
    }
  ]
}, 
{
  timestamps: true
});

const order = mongoose.model('Order', orderSchema);
export default order;
