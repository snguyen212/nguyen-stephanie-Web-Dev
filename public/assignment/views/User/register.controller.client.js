
(function(){
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

    //location allows you to change hash and navigation
    function RegisterController($location, UserService) {

        //view model design pattern
        // create variable
        //ptr to instance of current object i'm in
        var vm = this;

        vm.register = register;



        function register(username, password, password2) {
            //username is entered
            if(username) {
                //both passwords entered
                if(password && password2) {
                    //passwords match
                    if(password === password2) {
                        UserService
                            .createUser(username, password)
                            .then(
                                function(response) {
                                    var user = response.data;
                                    $location.url("/profile/" + user._id);

                                },
                                //error if username already exists
                                //the check will be done in the server
                                function(error) {
                                    vm.error = error.data;
                                })
                    }
                    else {
                        vm.error = "Please make sure your passwords match";
                    }

                }
                else {
                    vm.error = "Please enter a password";
                }

            }
            else {
                vm.error = "Please enter a username";
            }
        }
    }
    
            
})();
