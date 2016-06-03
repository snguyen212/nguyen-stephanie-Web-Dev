//UPDATED

(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, UserService) {
        var vm = this;
       
       // EVENT HANDLERS -----------------------------
        vm.updateUser = updateUser;
        vm.unregister = unregister;

        
        var id = $routeParams["id"];
        var index = -1;

        function init() {
            UserService
              .findUserById(id)
              .then(
                  function(response) {
                  vm.user = response.data;  //the user will populate profile here
              });
        }
        init();

        //use UserService to delete user ------------------
        function unregister(id) {
            UserService
                .deleteUser(id)  //id is in $routeParams
                .then(
                    //success will log you out and delete user
                    function(response) {
                        $location.url("/login");
                    },
                    
                    //user not found to even delete
                    function(error) {
                        vm.error = error.data;
                    });
        }
        
        

        //function for updating User Profile page
        function updateUser() {
            UserService
                .updateUser(vm.user._id, vm.user)
                .then(
                function(response) {
                    vm.success = "User successfully updated";
                    
                },
                function(error) {
                    vm.error = "User not found";
                })
        }
    }
})();