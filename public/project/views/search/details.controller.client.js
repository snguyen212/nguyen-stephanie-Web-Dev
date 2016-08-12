//when user is selected from search results list, display that user's info card   

(function(){
    angular
        .module("jamn")
        .controller("DetailsController", DetailsController);

    function DetailsController($location, $routeParams, UserService) {
        var vm = this;
        vm.id = $routeParams.id;
        vm.type = $routeParams.type;




        function init() {
            vm.id = $routeParams["id"];
            vm.userId = $routeParams["uid"];
            
            UserService
                .findUserById(vm.userId)
                .then(
                    function(user) {
                    vm.user = user.data;
                   // vm.username=user.username;


                },
                    function(error) {
                        vm.error = error.data;

                    });
        }
        init();

        
    }
})();