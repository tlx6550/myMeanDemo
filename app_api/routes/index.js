var express = require('express');
var router = express.Router();

//但并不是所有的都需要认证，特别是一些get方式的请求可以是匿名的。所以接下来需要做的一件事就是配置路由，用以阻止那些没有认证的请求到达我们指定的控制器。相当于是一个介于路由和控制器之间的中间件，当路由被调用了时，这个中间件在控制器之前激活，中间件验证之后再决定请求是否能到达控制器。这个模块就是express-jwt。
var jwt = require('express-jwt');
var auth = jwt({
    secret: process.env.JWT_SECRET,
    userProperty: 'payload'
});

var bookCtrl = require('../controllers/book');
var topicCtrl = require('../controllers/topic');
var ctrlAuth = require('../controllers/authentication');
//注意 这里的路由地址；当angluarjs 从前端发送请求的时候
//例如 $http.get('/api/book/' + bookid);
//底层的express模块 app.use(/api,***);就会捕捉到该请求
//此时api/×× 对应的路由就会出发相应的函数
//这里和不用angular 来请求 后台捕获路由的方式完全不同！
//有些需要认证的路由 如果不加auth认证 前端会报错提示找不到该路由
router.get('/books', bookCtrl.books);
router.post('/book', auth,bookCtrl.uploadImg, bookCtrl.bookCreate);
router.get('/book/:bookid', bookCtrl.bookReadOne);
router.put('/books/:bookid', auth, bookCtrl.bookUpdateOne);
router.delete('/book/:bookid', auth,bookCtrl.bookDeleteOne);

 router.post('/uploadImg',auth,bookCtrl.uploadImg);
//不同之处就是在这里的区别
// router.get('/api/books',bookCtrl.books);
// router.post('/api/book', auth, bookCtrl.bookCreate);
// router.get('/api/book/:bookid', bookCtrl.bookReadOne);
// router.put('/api/book/:bookid', auth, bookCtrl.bookUpdateOne);
// router.delete('/api/book/:bookid', auth, bookCtrl.bookDeleteOne);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


//topics
// router.get('/api/topics', topicCtrl.topics);
router.get('/topics', topicCtrl.topics);
module.exports = router;
