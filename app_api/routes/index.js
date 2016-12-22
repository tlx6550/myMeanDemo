var express = require('express');
var router = express.Router();
var bookCtrl = require('../controllers/books');
var topicCtrl = require('../controllers/topic');

// router.get('/books',bookCtrl.books);
// // router.get('/',bookCtrl.index);
// router.post('/book', bookCtrl.bookCreate);
// router.get('/Detail/:bookid', bookCtrl.bookReadOne);
// router.put('/books/:bookid', bookCtrl.bookUpdateOne);
// router.delete('/books/:bookid', bookCtrl.bookDeleteOne);

router.get('/api/books',bookCtrl.books);
router.post('/api/book', bookCtrl.bookCreate);
router.get('/api/book/:bookid', bookCtrl.bookReadOne);
router.put('/api/book/:bookid', bookCtrl.bookUpdateOne);
router.delete('/api/book/:bookid', bookCtrl.bookDeleteOne);

//topics
router.get('/api/topics', topicCtrl.topics);

module.exports = router;
