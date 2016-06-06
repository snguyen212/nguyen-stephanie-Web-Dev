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

        function deleteWebsite(websiteId) {
            WebsiteService
                .deleteWebsite(websiteId)  //id is in $routeParams
                .then(
                    function(response) {
                        $location.url("/User/{{website.developerId}}/website");
                    },

                    function(error) {
                        vm.error = error.data;
                    });
        }
    }
})();