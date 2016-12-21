var express = require('express');
var router = express.Router();
var homeController = require('../controllers/home');

router.get('/', homeController.index);
router.get('/about', homeController.about);
router.get('/books', homeController.books);
// router.get('/init', homeController.init);
router.get('/book/create', homeController.bookcreateview);
router.post('/book/create', homeController.doBookCreate);
router.get('/book/:id', homeController.detail);
router.delete('/book/:id', homeController.delete);
router.post('/uploadImg', homeController.uploadImg);

module.exports = router;