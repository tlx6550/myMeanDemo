(function () {
    angular
　　.module('readApp')
　　.directive('navigation', navigation);
    
    function navigation() {
        return {
            restrict: 'EA',
            templateUrl: '/common/directive/navigation/navigation.html',
            //同时也启用controllerAs语法，为了避免冲突(其他控制器的视图模型都叫vm，而导航条又会一直存在)，指定视图模型名称为navvm。
            controller: 'navigationCtrl as navvm'
        };
    }
})();