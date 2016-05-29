
(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;

        function init() {
            var userId = $routeParams.userId;

            //send websites to view for rendering
            vm.websites = WebsiteService.findWebsitesForUser(userId);
        }
        init();
    }
})();
