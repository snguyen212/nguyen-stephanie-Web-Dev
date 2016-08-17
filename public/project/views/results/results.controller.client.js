//UPDATED   

(function(){
    angular
        .module("jamn")
        .controller("ResultsController", ResultsController);

    function ResultsController($location, $rootScope, $routeParams, UserService) {
        var vm = this;
        vm.sessionUser = $rootScope.sessionUser;
        vm.id = $routeParams.id;
        vm.type = $routeParams.type;

        function init() {
            vm.id = $routeParams["id"];
            UserService
                .findAllUsersForType(vm.type)
                .then(
                    function(users) {
                    vm.users = users.data;

                },
                    function(error) {
                        vm.error = error.data;

                    });
        }
        init();

        
    }
})();