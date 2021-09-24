const Category = require('../models/category');
const Item = require('../models/item');
const { body, validationResult } = require('express-validator');

exports.categoryIndex = async function (req, res, next) {
  try {
    const [categoryCount, itemCount] = await Promise.all([
      Category.countDocuments({}),
      Item.countDocuments({}),
    ]);
    res.render('inventory_index', {
      title: 'Store Inventory',
      categoryCount,
      itemCount,
    });
  } catch (error) {
    next(error);
  }
};

exports.categoryList = async function (req, res, next) {
  try {
    const categoryList = await Category.find({});
    // TODO: implementar articulos por categoria.
    res.render('category_list', { title: 'Category List', categoryList });
  } catch (error) {
    next(error);
  }
};

exports.categoryDetails = async function (req, res, next) {
  try {
    const [category, items] = await Promise.all([
      Category.findById(req.params.id),
      Item.find({ category: req.params.id }),
    ]);
    res.render('category_details', {
      title: 'Category Details',
      category,
      items,
    });
  } catch (error) {
    next(error);
  }
};

exports.categoryCreateGet = function (req, res, next) {
  res.render('category_form', { title: 'Create New Category' });
};

exports.categoryCreatePost = [
  body('name', 'Name must have at least 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),
  body('description', 'Description must have at least 3 characters')
    .trim()
    .isLength({ min: 3 })
    .escape(),

  async function (req, res, next) {
    try {
      const errors = validationResult(req);

      const category = new Category({
        name: req.body.name,
        description: req.body.description,
      });

      if (!errors.isEmpty()) {
        res.render('category_form', {
          title: 'Create New Category',
          errors: errors.errors,
          category,
        });
      } else {
        const savedCategory = await category.save();
        res.redirect(savedCategory.url);
      }
    } catch (error) {
      next(error);
    }
  },
];

exports.categoryDeleteGet = function (req, res, next) {
  res.send('Not implemented: category delete get');
};

exports.categoryDeleteDelete = function (req, res, next) {
  res.send('Not implemented: category delete post');
};

exports.categoryUpdateGet = function (req, res, next) {
  res.send('Not implemented: category update get');
};

exports.categoryUpdatePatch = function (req, res, next) {
  res.send('Not implemented: category update post');
};
