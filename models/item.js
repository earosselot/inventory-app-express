// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, minLength: 3 },
  description: { type: String, minLength: 3 },
  category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  price: { type: Number, required: true, min: 0 },
  number_in_stock: { type: Number, required: true, min: 0 },
});

// Virtual for Item's URL
ItemSchema.virtual('url').get(function () {
  return `catalog/item/${this._id}`;
});

// export default mongoose.model('Item', ItemSchema);
module.exports = mongoose.model('Item', ItemSchema);
