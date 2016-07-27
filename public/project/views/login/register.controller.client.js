(function () {
    angular
        .module("jamn")
        .controller("RegisterController", RegisterController);

    //location allows you to change hash and navigation
    function RegisterController($location, $rootScope, UserService) {

        //view model design pattern
        // create variable
        //ptr to instance of current object i'm in
        var vm = this;
        vm.register = register;


        function register(username, pw, pw2, firstname, lastname, email, type) {
            //username is entered
            if (username) {
                if ((pw1 && pw2) && (pw1 === pw2)) {
                    UserService
                        .findUserByUsername(username)
                        .then(
                            function (user) {
                                if (user.data == null) {
                                    return {
                                        username: username,
                                        password: pw,
                                        firstname: firstname,
                                        lastame: lastname,
                                        email: email,
                                        type: type
                                    };

                                } else {
                                    vm.error = "User already exists";
                                }
                            })
                        .then(
                            function (user) {
                                UserService
                                    .createUser(username, pw, firstname, lastname, email, type)
                                    .then(
                                        function (response) {
                                            var user = response.data;
                                            $rootScope.currentUser = user;
                                            $location.url("/profile/" + user._id);

                                        },
                                        //error if username already exists
                                        // the check will be done in the server
                                        function (error) {
                                            vm.error = error.data;
                                        })
                            })

                } else {
                    vm.error = "Please make sure passwords match"
                }
            } else {
                vm.error = "Please enter a username";
            }
        }
    }
})();

