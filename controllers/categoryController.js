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
    if (error.name === 'CastError') {
      res.redirect('/inventory/category');
    } else {
      next(error);
    }
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

exports.categoryDeleteGet = async function (req, res, next) {
  try {
    const [category, items] = await Promise.all([
      Category.findById(req.params.id),
      Item.find({ category: req.params.id }),
    ]);
    if (!category) {
      res.redirect('/inventory/category');
    } else {
      res.render('category_delete', {
        title: 'Delete Category',
        category,
        items,
      });
    }
  } catch (error) {
    if (error.name === 'CastError') {
      res.redirect('/inventory/category');
    } else {
      next(error);
    }
  }
};

exports.categoryDeletePost = async function (req, res, next) {
  try {
    if (req.body.password === 'admin') {
      // Delete category from item's category field.
      const items = await Item.find({ category: req.body.categoryId });
      async function deleteCategory(item, categoryId) {
        await item.category.pull({ _id: categoryId });
        await item.save();
      }
      const itemsDeletePromises = [];
      items.forEach((item) =>
        itemsDeletePromises.push(deleteCategory(item, req.body.categoryId))
      );
      await Promise.all(itemsDeletePromises);

      // Delete category
      await Category.findByIdAndDelete(req.body.categoryId);

      res.redirect('/inventory/category');
    } else {
      res.redirect('/inventory/category/' + req.body.categoryId + '/delete');
    }
  } catch (error) {
    next(error);
  }
};

exports.categoryUpdateGet = async function (req, res, next) {
  try {
    const category = await Category.findById(req.params.id);
    res.render('category_form', { title: 'Update category', category });
  } catch (error) {
    next(error);
  }
};

exports.categoryUpdatePost = [
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
        _id: req.params.id,
      });

      if (!errors.isEmpty() || req.body.password !== 'admin') {
        res.render('category_form', {
          title: 'Create New Category',
          errors: errors.errors,
          category,
        });
      } else {
        const updatedCategory = await Category.findByIdAndUpdate(
          req.params.id,
          category,
          {}
        );
        res.redirect(updatedCategory.url);
      }
    } catch (error) {
      next(error);
    }
  },
];
