var request = require('request');
// var mongoose = require('mongoose');
// var db = require('../models/db.js');
var Book = require('../models/books');
var User = require('../models/user');
var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};
var apiOptions = {
    server : "http://localhost:3000"
};


module.exports.books = function (req, res) {
    Book.find().exec(function (err, books) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
            return;
        }
         sendJSONresponse(res, 200, books);
    });
}

module.exports.bookCreate = function (req, res) {
    console.log('创建bookCreate')
    getAuthor(req, res, function(req, res,user) {
        console.log("imgurl:", req.body.img);
        Book.create({
            title: req.body.title,
            info: req.body.info,
            img: req.body.img,
            tags: req.body.tags,
            brief: req.body.brief,
            ISBN: req.body.ISBN,
            rating: req.body.rating,
            username: user.name,
            userId:user._id
        }, function (err, book) {
            if (err) {
                console.log(err);
                console.log('控制器新建图书错误')
                sendJSONresponse(res, 400, err);
            } else {
                console.log("新增书籍:", book);
                sendJSONresponse(res, 201, book);
            }
        });
    });
};

var fs = require('fs');
var formidable = require('formidable');
module.exports.uploadImg = function (req, res,next) {
    console.log('创建上传表单')
  var form = new formidable.IncomingForm(); 
  console.log('form=='+form)
    //创建上传表单
      form.encoding = 'utf-8';        //设置编辑
      form.uploadDir = 'public/upload/temp/';     //设置上传目录
      form.keepExtensions = true;     //保留后缀
      form.maxFieldsSize = 3 * 1024 * 1024;   //文件大小
   console.log('form.parse'+form.parse);
    form.parse(req, function(err, fields, files) {

        console.log('files=='+files);
        console.log('fields=='+fields);
        if (err) {
            console.log(err);
          return res.json(0);        
        }
        for (var key in files) {
            console.log(files[key].path);
            var extName = ''; //后缀名
            switch (key.type) {
            case 'image/pjpeg':
                extName = 'jpg';
                break;
            case 'image/jpeg':
                extName = 'jpg';
                break;
            case 'image/png':
            case 'image/x-png':
            default:
                extName = 'png';
                break;
            }
            var avatarName = (new Date()).getTime() + '.' + extName;
            var newPath = form.uploadDir + avatarName;
            
            fs.renameSync(files[key].path, newPath); //重命名
            return res.json("/upload/temp/"+ avatarName);
            
        }
    });
    next();
};


module.exports.index = function (req, res) {
    var requestOptions, path;
    path = "/topics";
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {},
    }
    request(requestOptions, function (err, response, body) {
        console.log('这里从topics回传过来了')
        if (response.statusCode == 200) {
            // console.log('body=='+JSON.stringify(body))
            res.render('index', { title: 'Index', topics: body });
        } else {
            res.render('error', { message: err.message, error: err });
        }
    });
};
module.exports.bookReadOne = function (req, res) {
    var bookid = req.params.bookid;
    if (!bookid) {
        sendJSONresponse(res, 404, {
            "message": "Not found, bookid is required"
        });
        return;
    }
    Book.findById(bookid).exec(function (err, book) {
        if (!book) {
            sendJSONresponse(res, 404, {
                "message": "bookid not found"
            });
            return;
        } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }
       sendJSONresponse(res, 200, book);

    });
}

module.exports.bookUpdateOne = function (req, res) {
    var bookid = req.params.bookid;
    if (!bookid) {
        sendJSONresponse(res, 404, {
            "message": "Not found, bookid is required"
        });
        return;
    }
    Book.findById(bookid).exec(function (err, book) {
        if (!book) {
            sendJSONresponse(res, 404, {
                "message": "bookid not found"
            });
            return;
        } else if (err) {
            sendJSONresponse(res, 400, err);
            return;
        }
        book.title = req.body.title;
        book.rating = req.body.rating;
        book.info = req.body.info;
        book.img = req.body.img;
        book.tags = req.body.tags;
        book.brief = req.body.brief;
        book.ISBN = req.body.ISBN;
        book.save(function (err, book) {
            if (err) {
                sendJSONresponse(res, 404, err);
            } else {
                sendJSONresponse(res, 200, book);
            }
        });
    });


}

module.exports.bookDeleteOne = function (req, res) {
    var bookid = req.params.bookid;
    console.log("bookid", bookid);
    if (bookid) {
        Book.findByIdAndRemove(bookid)
            .exec(function (err) {
            if (err) {
                console.log(err);
                sendJSONresponse(res, 404, err);
                return;
            }
            console.log("book id :" + bookid + "deleted");
            sendJSONresponse(res, 204, null);
        });
    } else {
        sendJSONresponse(res, 404, { message: "No bookid" });
    }
}

//如果验证成功，那如何使用JWT数据呢？还需要实现一个getAuthor的方法，用来验证token，并获取当前用户信息。

var getAuthor = function (req, res, callback) {
    if (req.payload && req.payload.email) {
        User.findOne({ email: req.payload.email })
            .exec(function (err, user) {
            if (!user) {
                sendJSONresponse(res, 404, { message: "User not found" });
                return;
            }
            else if (err) {
                console.log(err);
                sendJSONresponse(res, 404, err);
                return;
            }
            callback(req, res,user);
        });
    } else {
        sendJSONresponse(res, 404, {
            message : "User not found"
        });
        return;
    }
};