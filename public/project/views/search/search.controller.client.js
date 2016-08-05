//UPDATED

(function(){
    angular
        .module("jamn")
        .controller("SearchController", SearchController);

    function SearchController($location, $rootScope, $routeParams, UserService, ResultsService) {
        var vm = this;
        vm.sessionUser = $rootScope.sessionUser;
        vm.userId = $routeParams["id"];
        

       // $scope.items = ['Drummer','Guitarist','Singer'];

        // function init() {
            // vm.id = $routeParams["id"];
            // $scope.items = ['Drummer','Guitarist','Singer'];
            // ResultsService
            //     .findAllResultsForType(vm.type)
            //     .then(
            //         function(response) {
            //         vm.results = response.data;
            //
            //     },
            //         function(error) {
            //             vm.error = error.data;
            //
            //         });

        //     vm.user = UserService.findUser(pageId);
        // }
        // init();


        function init() {
            vm.userId = $routeParams["id"];
            UserService
                .findAllUsers()
                .then(
                    function(users) {
                        vm.users = users.data;

                    },
                    function(error) {
                        vm.error = "No users found";

                    });
            UserService
                .findUserById(vm.userId)
                .then(function(user) {
                    vm.user = user.data;
                });
        }
        init();


    }
})();
