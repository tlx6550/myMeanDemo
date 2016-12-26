var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
    title: { type: String, required: true },
    rating: {
        type: Number,
        required: true,
        min: 0,
        max: 5
    },
    info: { type: String, required: true },
    img: String,
    tags: [String],
    brief: { type: String, required: true },
    ISBN: String,
    username: String,
    userId:String
});

//把模式导出
module.exports = BookSchema