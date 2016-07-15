//I don't know why my routes aren't working so i had to resort to using static pages...

(function () {
    angular
        .module("jamn")
        .config(Config);

    function Config($routeProvider) {   //helps to configure the routes
        $routeProvider


            .when("/home", {
                templateURL: "views/frontpage.html"
            })


            .when("/login", {
                templateUrl: "views/login/login.view.client.html",  //if you see #/login, go to her
                controller: "LoginController",
                controllerAs: "model" //our controller is the model


            })

            .when("/register", {
                templateUrl: "views/login/register.view.client.html",
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

            .when("/logout", {})

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

            .otherwise({
                templateUrl: "views/frontpage.html"
            });

        //CHECK IF LOGGED IN -------------------------
        function checkLoggedIn(UserService, $q, $location, $rootScope) {
            var deferred = $q.defer();

            UserService
                .checkLoggedIn()
                .then(
                    function (response) {
                        var user = response.data;
                        //console.log(user);
                        //0 means no one is logged in
                        if (user === '0') {
                            deferred.reject(); //not allowed to continue
                            $rootScope.currentUser = null;
                            $location.url("/login");
                        } else {
                            $rootScope.currentUser = user;
                            deferred.resolve(); //allow you to login
                        }
                    },
                    //if user is null, then goes to this error
                    function (error) {
                        deffered.reject();
                        $rootScope.currentUser = null;

                    }
                );
            return deferred.promise;
        }
    }


})();