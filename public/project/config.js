//I don't know why my routes aren't working so i had to resort to using static pages...

(function() {
    angular
        .module("jamn")
        .config(Config);

    function Config($routeProvider) {   //helps to configure the routes
        $routeProvider



            .when("/home", {
                templateURL: "views/frontpage.html"
            })


            .when("/login", {
                templateUrl: "views/login.view.client.html",  //if you see #/login, go to her
                controller: "LoginController",
                controllerAs: "model" //our controller is the model


            })

            .when("/register", {
                templateUrl: "views/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"

            })

            .when("/profile", {
                templateUrl: "views/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
                //resolve allows you to set conditions that allow u to go to this page
              //  resolve: { loggedin: checkLoggedIn }

            })

            .when("/profile:id", {
                templateUrl: "views/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
                //resolve allows you to set conditions that allow u to go to this page
                //  resolve: { loggedin: checkLoggedIn }

            })

            .when("/logout", {

            })

            .when("/search", {
                templateUrl: "views/search.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
                //resolve allows you to set conditions that allow u to go to this page
                //  resolve: { loggedin: checkLoggedIn }

            })

            .when("/search/:type", {
                templateUrl: "views/results.view.client.html",
                controller: "ResultsController",
                controllerAs: "model"
                //resolve allows you to set conditions that allow u to go to this page
                //  resolve: { loggedin: checkLoggedIn }

            })

            .when("/user/:userId/search", {
                templateUrl: "views/results.view.client.html",
                controller: "ResultsController",
                controllerAs: "model"
                //resolve allows you to set conditions that allow u to go to this page
                //  resolve: { loggedin: checkLoggedIn }

            })

            .when("/user/:userId/search/:type/results", {
                templateUrl: "views/results.view.client.html",
                controller: "ResultsController",
                controllerAs: "model"
                //resolve allows you to set conditions that allow u to go to this page
                //  resolve: { loggedin: checkLoggedIn }

            })

            .when("/user/:userId/search/:type/results/:userId", {
                templateUrl: "views/details.view.client.html",
                controller: "DetailsController",
                controllerAs: "model"
                //resolve allows you to set conditions that allow u to go to this page
                //  resolve: { loggedin: checkLoggedIn }

            })
            
            .when("/")



            .otherwise({
                redirectTo: "/home"

            });
    }

    
    
})();