
(function(){
    angular
        .module("WebAppMaker")
        .controller("PageListController", PageListController);

    function PageListController($routeParams, PageService) {
        var vm = this;

        function init() {
            var userId = $routeParams.userId;
            vm.pages = PageService.findPageByWebsiteId(websiteId);
        }
        init();
    }
})();