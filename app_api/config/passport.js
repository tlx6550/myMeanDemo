var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var mongoose = require('mongoose');
var User = mongoose.model('User');
//用passport来做认证管理
//使用passport.use方法配置策略，参数是一个策略的构造函数
passport.use(new LocalStrategy({
	//本地策略默认使用的字段是‘username’ 和‘password’，但我们是把email作为登录名，所以需要重载一下。
	usernameField: 'email'
},//参数中的done是一个回调函数
//通过email找到用户。
// 验证密码是否正确
// 如果密码正确返回用户对象。
// 否则的话返回一个错误提示信息。
 function(username, password, done) {
    User.findOne({ email: username }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (!user) {
            return done(null, false, { message: '用户不存在' });
        }
        if (!user.validPassword(password)) {
            return done(null, false, { message: '密码错误!' });
        }
        return done(null, user);

    });
}))