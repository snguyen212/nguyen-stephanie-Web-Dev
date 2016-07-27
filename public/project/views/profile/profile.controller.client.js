//UPDATED

(function(){
    angular
        .module("jamn")
        .controller("ProfileController", ProfileController);

    function ProfileController($location, $routeParams, $rootScope, UserService) {
        var vm = this;


        // EVENT HANDLERS -----------------------------
        vm.updateUser = updateUser;
        vm.unregister = unregister;
        vm.logout = logout;


        var id = $routeParams["id"];
        var index = -1;

        function init() {
            UserService
                .findUserById(id)
                .then(
                    function (response) {
                        vm.user = response.data;  //the user will populate profile here
                    });
        }

        init();

        //use UserService to delete user ------------------
        function unregister() {
            UserService
                .deleteUser(id)  //id is in $routeParams
                .then(
                    //success will log you out and delete user
                    function (response) {
                        $location.url("/login");
                    },

                    //user not found to even delete
                    function (error) {
                        vm.error = error.data;
                    });
        }


        //function for updating User Profile page
        function updateUser() {
            UserService
                .updateUser(vm.user._id, vm.user)
                .then(
                    function (response) {

                        vm.success = "User successfully updated";

                    },
                    function (error) {
                        vm.error = "User not found";
                    });
        }


        function logout() {
            UserService
                .logout()
                .then(
                    function () {
                        //tell rootscope the user we were catching is NOT valid anymore
                        $rootScope.currentUser = null;
                        $location.url("/login"); //send you back to login if successful
                    },

                    function () {
                        $rootScope.currentUser = null;
                        $location.url("/login"); //brings u to login page even if error
                    });
        }
    }
})();