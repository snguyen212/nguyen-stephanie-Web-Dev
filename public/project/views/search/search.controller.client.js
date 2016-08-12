//UPDATED

(function(){
    angular
        .module("jamn")
        .controller("SearchController", SearchController);

    function SearchController($location, $scope, $rootScope, $routeParams, UserService) {
        var vm = this;
        vm.sessionUser = $rootScope.sessionUser;

        $scope.types = ['Drummer', 'Guitarist', 'Singer'];
        $scope.searchtype = $scope.types[0];
        
        

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
