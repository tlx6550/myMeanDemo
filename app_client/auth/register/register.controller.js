(function() {
    angular.module('readApp')
        .controller('registerCtrl', registerCtrl);
    registerCtrl.$inject = ['$location','authentication'];
    function registerCtrl($location, authentication) {
        var vm = this;
        vm.credentials = {
            name: "",
            email: '',
            password: ''
        };
//用$location来获取参数page的值，然后赋值到returnPage，这样就知道了用户之前的页面。
        vm.returnPage = $location.search().page || '/';
        vm.onSubmit = function() {
            vm.formError = "";
            if (!vm.credentials.name || !vm.credentials.email || !vm.credentials.password) {
                vm.formError = "需要填完所有字段!";
                return false;
            } else {
                vm.doRegister();
            }
        };
        vm.doRegister = function() {
            vm.formError = "";
            authentication.register(vm.credentials).error(function(err) {
                vm.formError = err;
            }).then(function() {
                $location.search('page', null);
                $location.path(vm.returnPage);
            });
        };
    }
})();