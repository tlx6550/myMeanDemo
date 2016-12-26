//这个控制器有两个任务，一个是获取当前用户，一个是获取当前的地址以便用户登录或注册之后能跳转回来。所以这个控制器会使用到authentication和$location两个服务
(function() {
  　　  angular.module("readApp")
        .controller('navigationCtrl', navigationCtrl);
    navigationCtrl.$inject = ['$location', 'authentication'];
    function navigationCtrl($location, authentication) {
    	//在控制器中还是可以继续使用vm名称，只是在视图中换成了navvm：
        var vm = this;
        vm.currentPath = $location.path();
        //当用户登录后，我们还需要显示用户名称，并可以让用户可以退出。
        vm.isLoggedIn = authentication.isLoggedIn();
        vm.currentUser = authentication.currentUser();
        vm.logout = function () {
            authentication.logout();
            $location.path('/');
        };
    };
})()