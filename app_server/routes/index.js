var express = require('express');
var router = express.Router();
var homeController = require('../controllers/home');
var ctrlOthers = require('../controllers/other');

router.get('/', ctrlOthers.angularApp);

//以下路由都交给了angular路由处理，所以注释掉了
// router.get('/', homeController.index);
// router.get('/about', homeController.about);
// router.get('/books', homeController.books);
// // router.get('/init', homeController.init);
// router.get('/book/create', homeController.bookcreateview);
// router.post('/book/create', homeController.doBookCreate);
// router.get('/book/:id', homeController.detail);
// router.delete('/book/:id', homeController.delete);
// router.post('/uploadImg', homeController.uploadImg);

module.exports = router;