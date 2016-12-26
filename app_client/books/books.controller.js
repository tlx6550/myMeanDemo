(function () {
    angular
.module('readApp')
.controller('booksCtrl', booksCtrl);
    booksCtrl.$inject = ['booksData','$modal', '$location','authentication'];
    function booksCtrl(booksData,$modal, $location, authentication) {
        var vm = this;
        vm.message = "loading...";
        booksData.getBooks.success(function (data) {
            vm.message = data.length > 0 ? "" : "暂无数据";
            vm.books = data;
        }).error(function (e) {
            console.log(e);
            vm.message = "Sorry, something's gone wrong ";
        });
        vm.user = authentication.currentUser();
        vm.isLoggedIn = authentication.isLoggedIn();
        vm.currentPath = $location.path();

        vm.popupForm = function () {
            var modalInstance = $modal.open({
                templateUrl: '/bookModal/bookModal.html',
                controller: 'bookModalCtrl as vm',
                resolve : {
                    viewData: function () {
                        return {
                            title: "新增推荐",
                        };
                    }
                }
            });
            modalInstance.result.then(function (data) {
                vm.books.push(data);
            });
        };
        
        vm.removeBook = function (id) {
            console.log('删除id为'+id)
            if (confirm("确定删除？")) {
                booksData.removeBookById(id).success(function () {
                    for (var i = 0; i < vm.books.length; i++) {
                        if (vm.books[i]._id == id) {
                            vm.books.splice(vm.books.indexOf(vm.books[i]), 1);
                        }
                    }
                });
            }
        };

    }
})();