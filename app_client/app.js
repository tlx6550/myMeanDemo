(function () {

angular.module('readApp', ['ngRoute']);
//关于controllerAs http://www.tuicool.com/articles/77buyim
function config($routeProvider){
    $routeProvider
    .when('/',{
        templateUrl:'home/home.view.html',
        controller: 'homeCtrl',
        controllerAs:'vm'
    })
    .otherwise({redirectTo:'/'});
}

angular
.module('readApp')
.config(['$routeProvider', config]);
}
)();