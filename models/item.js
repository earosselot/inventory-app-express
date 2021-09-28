const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: { type: String, required: true, minLength: 3 },
  description: { type: String, minLength: 3 },
  category: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
  price: { type: Number, required: true, min: 0 },
  number_in_stock: { type: Number, required: true, min: 0 },
  image: String,
});

// Virtual for Item's URL
ItemSchema.virtual('url').get(function () {
  return `/inventory/item/${this._id}`;
});

ItemSchema.virtual('imagePath').get(function () {
  return `/uploads/${this.image}`;
});

module.exports = mongoose.model('Item', ItemSchema);
