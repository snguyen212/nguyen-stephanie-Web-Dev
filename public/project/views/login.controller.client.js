//UPDATED

(function () {
    angular
        .module("jamn")
        .controller("LoginController", LoginController);

    //location allows you to change hash and navigation
    //rootscope is global variable that is available for entire angular app
    function LoginController($location, $rootScope, UserService) {

        //view model design pattern
        // create variable
        //ptr to instance of current object i'm in
        var vm = this;

        vm.login = login;

        function login(username, password) {
            if (username === undefined && password === undefined) {
                vm.error = "Please enter both username and password";
            } else {
                UserService
                    .login(username, password)
                    .then(
                        function (response) {   //the user is in this response object
                            console.log(response);
                            var user = response.data;
                            $rootScope.currentUser = user;

                            if (user) {
                                var id = user._id;
                                $location.url("/profile/" + id);
                            }
                        },
                        //if login error
                        function (error) {
                            vm.error = "User not found";
                        })

            }
        }

        function logout() {
            UserService
                .logout()
                .then(
                    function (response) {
                        $rootScope.currentUser = null;
                        $location.url("/login");
                    });
        }


        //  var user = UserService.findUserByUsernameAndPassword(username, password);

    }

})();
