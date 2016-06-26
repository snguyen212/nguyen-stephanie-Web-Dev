

(function() {
    angular
        .module("jamn")
        .config(Config);

    function Config($routeProvider) {   //helps to configure the routes
        $routeProvider

            .when("/login", {
                templateUrl: "views/login.view.client.html"  //if you see #/login, go to her


            })

            .otherwise({
                redirectTo: "/"

            });;
    }

    
    
})();