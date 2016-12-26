(function () {
    angular
        .module('readApp')
        .service('authentication', authentication);
    
    authentication.$inject = ['$window','$http'];
    function authentication($window, $http) {
        var saveToken = function (token) {
            $window.localStorage['read-token'] = token;
        };
        var getToken = function () {
            return $window.localStorage['read-token'];
        };
        var register = function(user) {
            return $http.post('/api/register', user).success(function(data) {
                saveToken(data.token);
            });
        };
        var login = function(user) {
            return $http.post('/api/login', user).success(function(data) {
                saveToken(data.token);
            });
        };
        var logout = function() {
            $window.localStorage.removeItem('read-token');
        };
//接下来的问题是 如何获得用户登录之后的数据，比如显示姓名。 保存在localStorage中的数据包含了用户信息，我们需要解析jwt，不是简单的判断token是否存在，还要判断是否过期。所以我们还需要增加一个方法：isLoggedIn
        var isLoggedIn = function() {
            var token = getToken();
            if (token) {
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return payload.exp > Date.now() / 1000;
            } else {
                return false;
            }
        };
        //只有isloggedIn还不够，我们希望直接获取到用户的信息，比如email和name。因此还需要增加一个currentUser方法。
        var currentUser = function() {
            if (isLoggedIn()) {
                var token = getToken();
                var payload = JSON.parse($window.atob(token.split('.')[1]));
                return {
                    email: payload.email,
                    name: payload.name,
                };
            }
        };
        

        return {
            saveToken: saveToken,
            getToken: getToken,
            register: register,
            login: login,
            logout: logout,
            isLoggedIn: isLoggedIn,
            currentUser: currentUser,
        };
    }
})();