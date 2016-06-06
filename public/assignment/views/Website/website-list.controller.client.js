//UPDATED   

(function(){
    angular
        .module("WebAppMaker")
        .controller("WebsiteListController", WebsiteListController);

    function WebsiteListController($routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;

        function init() {
            WebsiteService
                .findAllWebsitesForUser(vm.userId)
                .then(
                    function(response) {
                    vm.websites = response.data;
                });
        }
        init();

    }
})();