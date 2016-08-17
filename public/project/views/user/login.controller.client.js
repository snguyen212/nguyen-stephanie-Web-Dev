//UPDATED

(function () {
    angular
        .module("jamn")
        .controller("LoginController", LoginController);

    //location allows you to change hash and navigation
    //rootscope is global variable that is available for entire angular app
    function LoginController($location, $rootScope, UserService) {
        //$rootScope.loggedIn = false;

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
            if(username && password) {
                UserService
                    .login(username, password)
                    .then(
                        function(res) {
                            console.log("in controller and res is = " + res);
                            var user = res.data;
                            if(user) {
                                $rootScope.currentUser = user;
                                var id = user._id;
                                // $rootScope.loggedIn = true;
                                if(user.bandsize > 1) {
                                    $location.url("/band/" + id);
                                }
                                else {
                                    $location.url("/artist" + id);
                                }
                            } else {
                                vm.error = "User not found";
                            }
                        });
            } else {
                vm.error = "Please enter both username and password";
            }
        }
    }
})();

