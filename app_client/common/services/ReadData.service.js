angular
.module('readApp')
.service('topicData', topicData)
.service('booksData', booksData)
.service('userData', userData);
//$inject作用在方法名称后面，等于是声明当前方法有哪些依赖项。
topicData.$inject = ['$http'];
function topicData ($http) {
    return $http.get('/api/topics');
};

booksData.$inject = ['$http','authentication'];
function booksData($http,authentication) {
    var getBooks = $http.get('/api/books');
    var getbookById = function(bookid) {
        return $http.get('/api/book/' + bookid);
    };
   //新增推荐书目现在是需要用户认证信息的，那么我们如何将用户的jwt通过Service传递到api呢？
   // jwt是通过一个叫Authorization的http头传递过去，但是有一定的格式，需要在'Bearer ' 单词后加个空格 然后再跟上jwt
     var addBook = function(data) {
        console.log('新增')
        return $http.post('/api/book', data, {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
        });
    };
     var removeBookById = function(bookid) {
        return $http.delete('/api/book/' + bookid, {
            headers: {
                Authorization: 'Bearer ' + authentication.getToken()
            }
        });
    };
    return {
        getBooks: getBooks,
        getbookById: getbookById,
        addBook: addBook,
        removeBookById: removeBookById
    };
};

function userData() {
    return {
        userName: "leolai",
    };
}
