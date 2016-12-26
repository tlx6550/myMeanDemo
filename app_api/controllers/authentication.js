var passport = require('passport');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};

//registration 方法需要做以下事情

// 验证必填的字段。
// 创建一个user的实例。
// 设置用户的name和email。
// 使用setPassword方法创建salt和hash。
// 保存数据
// 返回一个JWT。
module.exports.register=function(req, res) {
    if (!req.body.name || !req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, { message: "请完成所有字段" });
        return;
    }
    var user = new User();
    user.name = req.body.name;
    user.email = req.body.email;
    user.setPassword(req.body.password);
    user.save(function(err) {
        var token;
        if (err) {
            sendJSONresponse(res, 404, err);
        } else {
            token = user.generateJwt();
            sendJSONresponse(res, 200, { 'token': token });
        }
    });
}

module.exports.login = function(req, res) {
    if (!req.body.email || !req.body.password) {
        sendJSONresponse(res, 400, { message: '请输入邮箱和密码!' });
        return;
    }
    passport.authenticate('local', function(err, user, info) {
        var token;
        if (err) {
            sendJSONresponse(err, 404, err);
            return;
        }
        if (user) {
            token = user.generateJwt();
            sendJSONresponse(res, 200, { token: token });
        } else {
            sendJSONresponse(res, 401, info);
        }

    })(req,res);
};