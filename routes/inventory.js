const express = require('express');
const router = express.Router();

// Require controller modules.
const categoryController = require('../controllers/categoryController');
const itemController = require('../controllers/itemController');

/// CATEGORY ROUTES ///

router.get('/', categoryController.categoryIndex);

router.get('/category', categoryController.categoryList);

router.get('/category/create', categoryController.categoryCreateGet);

router.post('/category/:id/create', categoryController.categoryCreatePost);

router.get('/category/:id/delete', categoryController.categoryDeleteGet);

router.delete('/category/:id/delete', categoryController.categoryDeleteDelete);

router.get('/category/:id/update', categoryController.categoryUpdateGet);

router.patch('/category/:id/update', categoryController.categoryUpdatePatch);

router.get('category/:id/details', categoryController.categoryDetails);

/// ITEM ROUTES ///

router.get('/item', itemController.itemList);

router.get('/item/create', itemController.itemCreateGet);

router.post('/item/create', itemController.itemCreatePost);

router.get('/item/:id/delete', itemController.itemDeleteGet);

router.delete('/item/:id/delete', itemController.itemDeleteDelete);

router.get('/item/:id/update', itemController.itemUpdateGet);

router.patch('/item/:id/update', itemController.itemUpdatePatch);

module.exports = router;
