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
            PageService
                .updatePage(vm.pageId, page)
                .then(
                    function (response) {
                        $location.url("/user/" + vm.userId + "/website" + vm.websiteId + "/page");
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }

        function deletePage(pageId) {
            PageService
                .deletePage(pageId)
                .then(
                    function (response) {
                        $location.url("/user/"+ vm.userId + "/website/" + vm.websiteId + "/page");
                    },
                    function (error) {
                        vm.error = error.data;
                    }
                );
        }

    }
})();