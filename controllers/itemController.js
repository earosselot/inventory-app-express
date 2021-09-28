const Item = require('../models/item');
const Category = require('../models/category');
const { check, body, validationResult } = require('express-validator');

exports.itemList = async function (req, res, next) {
  try {
    const itemList = await Item.find({}, 'name price');
    res.render('item_list', { title: 'Item List', itemList });
  } catch (error) {
    next(error);
  }
};

exports.itemDetail = async function (req, res, next) {
  try {
    const item = await Item.findById(req.params.id).populate('category');
    res.render('item_details', { title: 'Item Details', item });
  } catch (error) {
    if (error.name === 'CastError') {
      res.redirect('/inventory/item');
    } else {
      next(error);
    }
  }
};

exports.itemCreateGet = async function (req, res, next) {
  try {
    const categories = await Category.find({});
    res.render('item_form', { title: 'Create New Item', categories });
  } catch (error) {
    next(error);
  }
};

exports.itemCreatePost = [
  function (req, res, next) {
    if (req.body.category === undefined) req.body.category = [];
    next();
  },

  body('name', 'Name must be at least 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('description', 'Description must be at least 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  // body('category.*').escape(),
  body('price', 'Price must be a Number').isNumeric(),
  check('price', 'Price must be greater than 0').isFloat({ min: 0 }),
  body(
    'number_in_stock',
    'Number of stock must be an integer number (ej.: 1, 2, 3)'
  )
    .trim()
    .isNumeric()
    .escape(),
  check('number_in_stock', 'Price must be greater than 0').isInt({ min: 0 }),

  async function (req, res, next) {
    const errors = validationResult(req, res, next);

    const item = new Item({
      name: req.body.name,
      description: req.body.description,
      category: req.body.category,
      price: req.body.price,
      number_in_stock: req.body.number_in_stock,
    });

    if (!errors.isEmpty()) {
      const categories = await Category.find({});
      categories.map((category) => {
        if (item.category.includes(category._id.toString()))
          category.checked = true;
      });
      res.render('item_form', {
        title: 'Create New Item',
        errors: errors.errors,
        item,
        categories,
      });
    } else {
      const savedItem = await item.save();
      res.redirect(savedItem.url);
    }
  },
];

exports.itemDeleteGet = async function (req, res, next) {
  try {
    const item = await Item.findById(req.params.id);
    res.render('item_delete', { title: 'Delete Item', item });
  } catch (error) {
    next(error);
  }
};

exports.itemDeletePost = async function (req, res, next) {
  try {
    await Item.findByIdAndDelete(req.body.itemId);
    res.redirect('/inventory/item');
  } catch (error) {
    next(error);
  }
};

exports.itemUpdateGet = function (req, res, next) {
  res.send('Not implemented: item update get');
};

exports.itemUpdatePatch = function (req, res, next) {
  res.send('Not implemented: item update post');
};
