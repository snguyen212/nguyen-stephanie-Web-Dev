//UPDATED

(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.updateUser = updateUser;

        var id = $routeParams["id"];
        var index = -1;
        function init() {
          UserService
              .findUserById(id)
              .then(function(response) {
                  vm.user=response.data   //the user will popular
              })
        }
        init();


        //function for updating User Profile page
        function updateUser() {
            UserService.updateUser(vm.user._id, vm.user);
            if(result === true) {
                vm.success = "User successfully updated";
            } else {
                vm.error = "User not found";
            }
        }
    }
})();