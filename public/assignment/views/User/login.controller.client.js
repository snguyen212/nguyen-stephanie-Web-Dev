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

        function login(username, password) {
            if (username === undefined && password === undefined)
                vm.error = "Please enter both username and password";
            UserService
                .findUserByUsernameAndPassword(username, password)
                .then(
                    function(response) {
                        console.log(response);
                        var user = response.data;

                        if(user) {
                        var id = user._id;
                        $location.url("/profile/" + id);
                    }
                }, 
                    //if login error
                    function (error) {
                        vm.error = "User not found";
                    })
        
            
        }
                    
                
          //  var user = UserService.findUserByUsernameAndPassword(username, password);
           
    }

})();
