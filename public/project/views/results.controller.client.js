//UPDATED   

(function(){
    angular
        .module("jamn")
        .controller("ResultsController", ResultsController);

    function ResultsController($location, $routeParams, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.type = $routeParams.type;

        function init() {
            ResultsController
                .findAllResultsForType(vm.type)
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