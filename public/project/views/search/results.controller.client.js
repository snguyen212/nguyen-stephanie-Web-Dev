//UPDATED   

(function(){
    angular
        .module("jamn")
        .controller("ResultsController", ResultsController);

    function ResultsController($location, $routeParams, ResultsService) {
        var vm = this;
        vm.id = $routeParams.id;
        vm.type = $routeParams.type;

        function init() {
            ResultsService
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