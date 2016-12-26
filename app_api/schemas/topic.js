var mongoose = require('mongoose');
var CommentSchema = require('../schemas/comment')
var TopicSchema = new mongoose.Schema({
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
    comments: [CommentSchema],
    deleted: { type: Boolean, default: false },
    top: { type: Boolean, default: false }, // 置顶帖
    good: { type: Boolean, default: false }, // ¾«»ªÌû
});

//把模式导出
module.exports = TopicSchema