angular.module('readApp').controller('homeCtrl',homeCtrl);
//$inject作用在方法名称后面，等于是声明当前方法有哪些依赖项。注意当前注入的是topicData依赖项【且】前面没有$符号
homeCtrl.$inject = ['topicData'];
function homeCtrl(topicData) {
    var vm = this;
    vm.message = 'loading...';
    topicData.success(function(data){
        vm.message = data.length > 0 ? "":"暂无数据";
        vm.data = data;
    }).error(function(e){
        console.log(e);
        vm.message = "Sorry, something's gone wrong ";
    });
    vm.user = {
        userName: "LEOLAI",
    };
}