#! /usr/bin/env node

// Get arguments passed on command line
const userArgs = process.argv.slice(2);

const Item = require('./models/item');
const Category = require('./models/category');

const mongoose = require('mongoose');
const mongoDB = userArgs[0];
mongoose.connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

const categories = [];
const items = [];

// TODO descriptions are not being saved to the db

async function createCategory(name, description) {
  try {
    const categoryDetails = { name: name, description: description };

    const category = new Category(categoryDetails);
    await category.save();
    categories.push(category);
  } catch (error) {
    console.log(error.message);
  }
}

async function createItem(name, description, category, price, number_in_stock) {
  try {
    const itemDetails = { name: name, description: description, price: price, number_in_stock: number_in_stock};
    if (category) itemDetails.category = category;

    const item = new Item(itemDetails);
    await item.save();
    items.push(item);
  } catch (error) {
    console.log(error.message);
  }
}

async function createCategories() {
  try {
    await Promise.all([
      createCategory('velas aromaticas', 'velas con aromas'),
      createCategory(
        'shampoo',
        'shampoo solido para distintos tipos de cabello'
      ),
      createCategory(
        'crema enjuague',
        'crema enjuague solida para distintos tipos de cabello'
      ),
      createCategory('jabon', 'jabon para el cuerpo'),
    ]);
  } catch (error) {
    console.log(error.message);
  }
}

async function createItems() {
  try {
    await Promise.all([
      createItem('vela de coco', 'aroma a jazmin', [categories[0],], 130.3, 5),
      createItem('vela de coco', 'aroma a rosas', [categories[0],], 123.4, 10),
      createItem('jabon de manos', 'con semillas', [categories[3],], 80, 3),
      createItem(
        'shampoo chico',
        '40g de shampoo, rinde 40 lavados',
        [categories[1],],
        400,
        7
      ),
      createItem(
        'enjuague grande',
        '80g de enjuague solido, rinde 80 lavados',
        [categories[0],],
        800,
        5
      ),
      createItem(
        'kit shampoo-crema enjuague grandes',
        '80g de shapoo y 80g de crema de enjuague',
        [categories[1],categories[2]],
        1500,
        3
      ),
      createItem(
        'cepillo de dientes',
        'cepillo ecologico de bamboo',
        false,
        200,
        4
      ),
    ]);
  } catch (error) {
    console.log(error.message);
  }
}

(async () => {
  try {
    await createCategories();
    await createItems();
    mongoose.connection.close();
  } catch (error) {
    console.log(error.message);
  }
})();
