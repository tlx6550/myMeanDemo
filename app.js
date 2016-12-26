﻿//node有一个dotenv的模块，可以将.env文件里面的密钥设置成环境变量
require('dotenv').load();
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
//使用UglifyJS 去最小化JavaScript文件UglifyJS 能将Angular应用的源文件合并成一个文件然后压缩
var uglifyJs = require("uglifyjs");
var fs = require('fs');

var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var routes = require('./app_server/routes/index');
var routesApi = require('./app_api/routes/index')
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
console.log('app.js__dirname==='+__dirname)
app.use(express.static(path.join(__dirname, 'app_client')))
// 链接数据库
var db = require('./app_api/models/db.js');
//引用passport。引用策略配置
var passport = require('passport');
require('./app_api/config/passport');

//初始化通行证
app.use(passport.initialize());

//改为由angular的路由接入 替代routes
 // app.use('/', routes);
app.use('/api',routesApi);
app.use(function (req, res) {
    res.sendfile(path.join(__dirname, 'app_client', 'index.html'));
});
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

var appClientFiles = [
    'app_client/app.js',
    'app_client/home/home.controller.js',
    'app_client/common/services/ReadData.service.js',
    'app_client/common/services/authentication.service.js',
    'app_client/common/filters/formatDate.filter.js',
    'app_client/common/directive/ratingStars/ratingStars.directive.js',
    'app_client/common/directive/footer/footer.directive.js',
    'app_client/common/directive/navigation/navigation.directive.js',
    'app_client/common/directive/navigation/navigation.controller.js',
    'app_client/about/about.controller.js',
    'app_client/books/books.controller.js',
    'app_client/bookDetail/bookDetail.controller.js',
    'app_client/bookModal/bookModal.controller.js',
    'app_client/auth/register/register.controller.js',
    'app_client/auth/login/login.controller.js'
];
var uglified = uglifyJs.minify(appClientFiles, { compress : false });

fs.writeFile('public/angular/readApp.min.js', uglified.code, function (err) {
    if (err) {
        console.log(err);
    } else {
        console.log('脚本生产并保存成功: readApp.min.js');
    }
});
// error handlers
//如果请求的token是非法的或者根本不存在，中间件将抛出错误并阻止代码继续执行。所以我们应该捕获到错误并返回一个未认证的消息和一个401的状态
app.use(function(err, req, res, next) {
    if (err.name == 'UnauthorizedError') {
        res.status(401);
        res.json({ message: err.name + ":" + err.message });
    }
});
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;