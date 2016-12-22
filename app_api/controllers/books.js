var request = require('request');
var mongoose = require('mongoose');
 var BookModel = mongoose.model('Book');
var sendJSONresponse = function (res, status, content) {
    res.status(status);
    res.json(content);
};
var apiOptions = {
    server : "http://localhost:3000"
};
module.exports.books = function (req, res) {
    BookModel.find().exec(function (err, books) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
            return;
        }
         sendJSONresponse(res, 200, books);
    });
}

module.exports.bookCreate = function (req, res) {
    BookModel.create({
        title: req.body.title,
        info: req.body.info,
        img: req.body.img,
        tags: req.body.tags,
        brief: req.body.brief,
        rating: req.body.rating,
        ISBN: req.body.ISBN
    }, function(err, book) {
        if (err) {
            console.log(err);
            sendJSONresponse(res, 400, err);
        } else {
            console.log(book);
            sendJSONresponse(res, 201, book);
        }
    });
}
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
    BookModel.findById(bookid).exec(function (err, book) {
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
    BookModel.findById(bookid).exec(function (err, book) {
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
        BookModel.findByIdAndRemove(bookid)
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