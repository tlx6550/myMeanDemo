angular
.module('readApp')
.service('topicData',topicData);
//$inject作用在方法名称后面，等于是声明当前方法有哪些依赖项。
topicData.$inject = ['$http'];
function topicData($http){
    return $http.get('/api/topics')
}