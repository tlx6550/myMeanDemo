(function () {    
    angular
    .module('readApp')
    .controller('bookModalCtrl', bookModalCtrl);
    
    bookModalCtrl.$inject = ['$modalInstance', 'viewData','booksData'];
    function bookModalCtrl($modalInstance, viewData, booksData) {
        var vm = this;
        vm.viewData = viewData;
        
        vm.onSubmit = function () {
           console.log(' 上传图片执行')
            vm.formError = "";
            if (!vm.formData.title || !vm.formData.rating || !vm.formData.brief || !vm.formData.info || !vm.formData.ISBN) {
                vm.formError = "请完成所有栏目!";
                return false;
            } else {
                console.log(vm.formData);
                vm.doAddBook(vm.formData);
                return false;
            }
        };
        vm.uploadMe = function(){
               console.log(9999999)
               console.log('this=='+JSON.stringify(vm))
               var uploader = new plupload.Uploader({
                    runtimes: 'html5,flash,silverlight,html4',
                    browse_button: "upload",
                    url: '/book',
                    flash_swf_url: '/plupload-2.1.8/js/Moxie.swf',
                    silverlight_xap_url: '/plupload-2.1.8/js/Moxie.xap',
                    filters: {
                        max_file_size: "3mb",
                        mime_types: [
                            { title: "Image files", extensions: "jpg,gif,png" },
                            { title: "Zip files", extensions: "zip" }
                        ]
                    },
                    init: {
                        PostInit: function () {
                            console.log('图片上传附件初始化完成')
                        },
                        FilesAdded: function (up, files) {
                            plupload.each(files, function (file) {
                                uploader.start();
                            });
                        },
                        UploadProgress: function (up, file) {
                        },
                        Error: function (up, err) {
                        }
                    }
                });
                uploader.init();
                // uploader.disableBrowse(false);
                uploader.bind('FileUploaded', function (upldr, file, object) {
                     console.log('图片上传事件')
                     var data = JSON.parse(object.response);
                    // console.log('使用插件上传图片数据为'+data);
                    $("#img").attr("src", data);
                    $("#imgvalue").val(data);
                    console.log($("#imgvalue").val());
                });
        }
        vm.doAddBook = function (formData) {
            console.log('formData.img=='+formData.img)
            booksData.addBook({                
                title: formData.title,
                info: formData.info,
                ISBN: formData.ISBN,
                brief: formData.brief,
                tags: formData.tags,
                img: formData.img,
                rating: formData.rating,
            }).success(function(data) {
                // console.log("保持新加书本成功，数据为"+data);
                vm.modal.close(data);
                //alert(1);
            }).error(function(data) {
                vm.formError = "添加失败，请再试一次";
            });
            return false;
        };
        vm.modal = {
            close : function (result) {
                $modalInstance.close(result);
            },
            cancel : function () {
                $modalInstance.dismiss('cancel');
            }
        };

    }

})();
