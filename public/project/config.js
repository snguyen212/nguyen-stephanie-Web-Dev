
(function() {
    angular
        .module("jamn")
        .config(Config);

    function Config($routeProvider) {   //helps to configure the routes
        $routeProvider

            .when("/login", {
                templateUrl: "views/login.view.client.html",  //if you see #/login, go to her
                controller: "LoginController",
                controllerAs: "model" //our controller is the model


            })

            .otherwise({
                redirectTo: "frontpage.html"

            });
    }

    
    
})();