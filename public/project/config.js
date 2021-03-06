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
                templateUrl: "views/user/login.view.client.html",  //if you see #/login, go to her
                controller: "LoginController",
                controllerAs: "model" //our controller is the model


            })

            .when("/register", {
                templateUrl: "views/user/registerpg1.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"

            })

            .when("/regartist", {
                templateUrl: "views/user/register.artist.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"


            }).when("/regband", {
                templateUrl: "views/user/register.band.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"

            })

            .when("/band/:id", {
                templateUrl: "views/profile/profile.band.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
                //resolve allows you to set conditions that allow u to go to this page
                //  resolve: { loggedin: checkLoggedIn }

            })

            .when("/artist/:id", {
                templateUrl: "views/profile/profile.artist.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
                //resolve allows you to set conditions that allow u to go to this page
                //  resolve: { loggedin: checkLoggedIn }

            })

            .when("/artist/:id/search", {
                templateUrl: "views/search/search.artist.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
                //resolve allows you to set conditions that allow u to go to this page
                //  resolve: { loggedin: checkLoggedIn }

            })

            .when("/artist/:id/search/:type", {
                templateUrl: "views/results/results.artist.view.client.html",
                controller: "ResultsController",
                controllerAs: "model"
                //resolve allows you to set conditions that allow u to go to this page
                //  resolve: { loggedin: checkLoggedIn }

            })
            
            .when("/artist/:id/search/:type/:uid", {
                templateUrl: "views/details/details.artist.view.client.html",
                controller: "DetailsController",
                controllerAs: "model"
                //resolve allows you to set conditions that allow u to go to this page
                //  resolve: { loggedin: checkLoggedIn }

            })

            .when("/band/:id/search", {
                templateUrl: "views/search/search.band.view.client.html",
                controller: "SearchController",
                controllerAs: "model"
                //resolve allows you to set conditions that allow u to go to this page
                //  resolve: { loggedin: checkLoggedIn }

            }) 
            
            // .when("/band/:id/search/:type", {
            //     templateUrl: "views/search/results.band.view.client.html",
            //     controller: "SearchController",
            //     controllerAs: "model"
            //     //resolve allows you to set conditions that allow u to go to this page
            //     //  resolve: { loggedin: checkLoggedIn }
            //
            // })

            .when("/band/:id/search/:type", {
                templateUrl: "views/results/results.band.view.client.html",
                controller: "ResultsController",
                controllerAs: "model"
                //resolve allows you to set conditions that allow u to go to this page
                //  resolve: { loggedin: checkLoggedIn }

            })

            .when("/band/:id/search/:type/:uid", {
                templateUrl: "views/details/details.band.view.client.html",
                controller: "DetailsController",
                controllerAs: "model"
                //resolve allows you to set conditions that allow u to go to this page
                //  resolve: { loggedin: checkLoggedIn }

            })

            .when("/artist/result", {
                templateUrl: "views/results/results.artist.view.client.html",
                controller: "ResultsController",
                controllerAs: "model"
                //resolve allows you to set conditions that allow u to go to this page
                //  resolve: { loggedin: checkLoggedIn }

            })

            .when("/profile/:id", {
                templateUrl: "views/profile/profile.artist.view.client.html",
                controller: "ProfileController",
                controllerAs: "model"
                //resolve allows you to set conditions that allow u to go to this page
                //  resolve: { loggedin: checkLoggedIn }

            }) 
            

            .when("/logout", {})


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