const express = require('express');
const router = express.Router();

// Require controller modules.
const categoryController = require('../controllers/categoryController');
const itemController = require('../controllers/itemController');

/// CATEGORY ROUTES ///

router.get('/', categoryController.categoryIndex);

router.get('/category', categoryController.categoryList);

router.get('/category/create', categoryController.categoryCreateGet);

router.post('/category/create', categoryController.categoryCreatePost);

router.get('/category/:id/delete', categoryController.categoryDeleteGet);

router.post('/category/:id/delete', categoryController.categoryDeletePost);

router.get('/category/:id/update', categoryController.categoryUpdateGet);

router.post('/category/:id/update', categoryController.categoryUpdatePost);

router.get('/category/:id', categoryController.categoryDetails);

/// ITEM ROUTES ///

router.get('/item', itemController.itemList);

router.get('/item/create', itemController.itemCreateGet);

router.post('/item/create', itemController.itemCreatePost);

router.get('/item/:id/delete', itemController.itemDeleteGet);

router.post('/item/:id/delete', itemController.itemDeletePost);

router.get('/item/:id/update', itemController.itemUpdateGet);

router.post('/item/:id/update', itemController.itemUpdatePost);

router.get('/item/:id', itemController.itemDetail);

module.exports = router;
