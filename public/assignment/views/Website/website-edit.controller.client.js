
(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    //fetch userid and website id with routeParams
    //use website service to fetch website id
    function EditWebsiteController($routeParams, WebsiteService) {
        var vm = this;

        //you can see userId in Config file (right inside the urls
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;

        //function is defined in website service
        function init() {
            vm.website = WebsiteService.findWebsiteById(vm.websiteId);
        }
        init();

    }
})();