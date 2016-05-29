//UPDATED

(function(){
    angular
        .module("WebAppMaker")
        .controller("LoginController", LoginController);

    //location allows you to change hash and navigation
    function LoginController($location, UserService) {

        //view model design pattern
        // create variable
        //ptr to instance of current object i'm in
        var vm = this;

        vm.login = login;

        function login (username, password) {
            var user = UserService.findUserByUsernameAndPassword(username, password);
            if(user) {
                var id = user._id;
                $location.url("/profile/" + id);
            } else {
                vm.error = "User not found";
            }
        }
    }
})();
