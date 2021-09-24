const Item = require('../models/item');

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
    res.render('item_detail', { title: 'Item Details', item });
  } catch (error) {
    next(error);
  }
};

exports.itemCreateGet = function (req, res, next) {
  res.send('Not implemented: item create get');
};

exports.itemCreatePost = function (req, res, next) {
  res.send('Not implemented: item create post');
};

exports.itemDeleteGet = function (req, res, next) {
  res.send('Not implemented: item delete get');
};

exports.itemDeleteDelete = function (req, res, next) {
  res.send('Not implemented: item delete post');
};

exports.itemUpdateGet = function (req, res, next) {
  res.send('Not implemented: item update get');
};

exports.itemUpdatePatch = function (req, res, next) {
  res.send('Not implemented: item update post');
};
