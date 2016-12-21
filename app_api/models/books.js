var mongoose = require('mongoose');

var bookSchema = new mongoose.Schema({
    title: String,
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    info: String,
    img: String,
    tags: [String],
    brief: String,
    ISBN: String
});

var userSchema = new mongoose.Schema({
    userName: String,
    email: String,
    password: String,
    createdOn: {
        type: Date,
        default: Date.now
    },
    img: String,
    ip: String,
    mobile: String
});

var commentSchema = new mongoose.Schema({
    user: userSchema,
    createdOn: {
        type: Date,
        default: Date.now
    },
    content: String
});
var topicSchema = new mongoose.Schema({
    title: String,
    type: String,
    visitedCount: { type: Number, default: 0 },
    commentCount: { type: Number, default: 0 },
    createdOn: {
        type: Date,
        default: Date.now
    },
    img: String,
    author: String,
    content: String,
    comments: [commentSchema],
    deleted: { type: Boolean, default: false },
    top: { type: Boolean, default: false }, // 置顶帖
    good: { type: Boolean, default: false }, // ¾«»ªÌû
});


// 这个时候的shema 还不具备数据库的操作能力，还需要注册下
mongoose.model('Book', bookSchema);
mongoose.model('Topic', topicSchema);
//生成模型model
// var books = mongoose.model('books',bookSchema)
// module.exports = books

