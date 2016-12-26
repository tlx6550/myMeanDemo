// var mongoose = require('mongoose');
var Topic = require('../models/topic');
//这里的sendJSONresponse返回的数据会给到books.js控制器的request模块的request方法捕获，从而做相应的渲染处理
var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};


module.exports.topics = function (req, res) {
    // console.log('这里从home的控制器index跳转过来这topics')
    Topic.find().exec(function (err, topic) {
        if (err) {
            
            console.log('err==='+err);
            sendJSONresponse(res, 400, err);
            return;
        }
        sendJSONresponse(res, 200, topic);
    });
}