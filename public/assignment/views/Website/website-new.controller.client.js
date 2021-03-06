
(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    //fetch userid and website id with routeParams
    //use website service to fetch website id
    function NewWebsiteController($routeParams, WebsiteService) {
        var vm = this;

        //you can see userId in Config file (right inside the urls
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        
       vm.createWebsite = createWebsite;
        
        function createWebsite(website) {
            if (name) {
                WebsiteService
                    .createWebsite(vm.userId, website)
                    .then(
                        function(response) {
                            var newWebsite = response.data;
                        },
                        function(error) {
                            vm.error = error;
                        });
            } 
            else {
                vm.error = "Please enter a name for your website";

            }
        }

        //function is defined in website service
        

    }
})();