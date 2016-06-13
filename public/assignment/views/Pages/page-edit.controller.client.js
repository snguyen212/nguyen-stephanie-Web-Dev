(function () {
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.updatePage = updatePage;
        vm.deletePage = deletePage;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        

        function init() {
            PageService
                .findPageById(vm.pageId)
                .then(
                    function(response) {
                    vm.page = response.data;
                });
        }
        init();


        function updatePage(page) {
            if(page.name) {
                PageService
                    .updatePage(vm.pageId, page)
                    .then(
                        function (response) {
                            $location.url("/User/" + vm.userId + "/website/" + vm.websiteId + "/page");
                        },
                        function (error) {
                            vm.error = "Error updating page";
                        }
                    );
            }
            else {
                vm.error = "Please enter a page name";
            }
        }

        function deletePage(pageId) {
            PageService
                .deletePage(pageId)
                .then(
                    function(response) {
                        $location.url("/User/"+ vm.userId + "/website/" + vm.websiteId + "/page");
                    },
                    function(error) {
                        vm.error = error.data;
                    }
                );
        }

    }
})();