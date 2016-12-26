var mongoose = require('mongoose')
var BookSchema = require('../schemas/book')
//关于book重复定义问题
//http://stackoverflow.com/questions/14641834/how-to-get-rid-of-error-overwritemodelerror-cannot-overwrite-undefined-mode
var Book;
// var Book = mongoose.model('Book',BookSchema)
if (mongoose.models.Book) {
    //这里生成的Book 对应数据库中的books表
  Book = mongoose.model('Book');
} else {
  Book = mongoose.model('Book', BookSchema);
}
module.exports = Book