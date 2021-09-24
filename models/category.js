// import mongoose from 'mongoose';
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CategorySchema = new Schema({
  name: { type: String, required: true, minLength: 3 },
  description: { type: String, minLength: 3 },
});

// Virtual for Category's URL
CategorySchema.virtual('url').get(function () {
  return `/inventory/category/${this._id}`;
});

// export default mongoose.model('Category', CategorySchema);
module.exports = mongoose.model('Category', CategorySchema);
