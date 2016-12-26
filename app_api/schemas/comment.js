var mongoose = require('mongoose');
var UserSchema = require('../schemas/user')
var CommentSchema = new mongoose.Schema({
    user: UserSchema,
    createdOn: {
        type: Date,
        default: Date.now
    },
    content: String
});

//把模式导出
module.exports = CommentSchema