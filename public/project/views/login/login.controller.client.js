//UPDATED

(function () {
    angular
        .module("jamn")
        .controller("LoginController", LoginController);

    //location allows you to change hash and navigation
    //rootscope is global variable that is available for entire angular app
    function LoginController($location, $rootScope, UserService) {
        $rootScope.loggedIn = false;

        //view model design pattern
        // create variable
        //ptr to instance of current object i'm in
        var vm = this;
        vm.login = login;

        function login(username, password) {
            // var user = {
            //     username: username,
            //     password: password
            // };
            UserService
                .login(username, password)
                .then(function(response) {
                    var user = response.data;
                    if (user) {
                        var id = user._id;
                        $rootScope.currentUser = user;
                       // $rootScope.loggedIn = true;
                        $location.url("/profile/" + id);
                    }
                    else {
                        vm.error = "User not found";
                    }
                })
        }
    }
})();

