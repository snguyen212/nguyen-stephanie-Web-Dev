//when user is selected from search results list, display that user's info card   

(function(){
    angular
        .module("jamn")
        .controller("DetailsController", DetailsController);

    function DetailsController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.type = $routeParams.type;

        function init() {
            DetailsController
                .findUserById(vm.userId)
                .then(
                    function(response) {
                    vm.results = response.data;

                },
                    function(error) {
                        vm.error = error.data;

                    });
        }
        init();

        
    }
})();