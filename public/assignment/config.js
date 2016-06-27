

(function(){
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {   //helps to configure the routes
        $routeProvider
            
            //user routes
            

            .when("/login", {
                templateUrl: "views/User/login.view.client.html",  //if you see #/login, go to here
                controller: "LoginController",
                controllerAs: "model" //our controller is the model


            })
            //if no id, then this is my own profile
            .when("/profile", {
                templateUrl: "views/User/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model", //our controller is the model
                //resolve allows you to set conditions that allow u to go to this page
                resolve: { loggedin: checkLoggedIn }

            })

            //id of someone elses profile
            .when("/profile/:id", {
                templateUrl: "views/User/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model", //our controller is the model
                //resolve allows you to set conditions that allow u to go to this page
                resolve: { loggedin: checkLoggedIn }

            })


            .when("/register", {
                templateUrl: "views/User/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"

            })

            .when("/logout", {
                
            })

            
            
            //Website Routes -----------

            .when("/User/:userId/website", {
                templateUrl: "views/Website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"

            })

            .when("/User/:userId/website/:websiteId", {
                templateUrl: "views/Website/website-edit.view.client.html"

            })

            .when("/User/:uid/website/new", {
                templateURL: "views/Website/website-new.view.client.html",
                controller: "NewWebsiteController",
                controllerAs: "model"
            })
                
        
            // PAGE Routes -------------------------------------------
            .when("/User/:userId/website/:websiteId/page", {
                templateUrl: "views/Pages/page-list.view.client.html",
                controller: "PageListController",
                controllerAs: "model"
            })

            .when("/user/:userId/website/:websiteId/page/new", {
                templateUrl: "views/Pages/page-new.view.client.html",
                controller: "NewPageController",
                controllerAs: "model"
            })
            
            .when("/User/:userId/website/:websiteId/page/:pageId", {
                templateUrl: "views/Pages/page-edit.view.client.html",
                controller: "EditPageController",
                controllerAs: "model"
            })
                
        
        
            //Widget Routes ------------------------------------------
            .when("/User/:uid/website/:wid/page/:pid/widget", {
                templateUrl: "views/Widget/widget-list.view.client.html",
                controller: "WidgetListController",
                controllerAs: "model"
            })
            
                
            .when("/User/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "views/Widget/widget-chooser.view.client.html",
                controller: "NewWidgetController",
                controllerAs: "model"
                
            })

            //widget-edit controller can get :widgetId because of the var... = $routeParams...
            .when("/User/:uid/website/:wid/page/:pid/widget/:widgetId", {
                templateUrl: "views/Widget/widget-edit.view.client.html",
                controller: "WidgetEditController",
                controllerAs: "model"

            })

            .when("/User/:uid/website/:wid/page/:pid/widget/:widgetId/html", {
                templateUrl: "views/Widget/widget-html-edit.view.client.html",
                controller: "WidgetHtmlEditController",
                controllerAs: "model"

            })
            

            .when("/flickr", {
                templateUrl: "views/Widget/widget-flickr-search.view.client.html",
                controller: "FlickrImageSearchController",
                controllerAs: "model"
            })

            //if NONE of the routes above, go to login page
            .otherwise({
                redirectTo: "/login"

            });

        //CHECK IF LOGGED IN -------------------------
        function checkLoggedIn(UserService, $q, $location, $rootScope) {
            var deferred = $q.defer();

            UserService
                .checkLoggedIn()
                .then(
                    function(response) {
                        var user = response.data;
                        //console.log(user);
                        //0 means no one is logged in
                        if(user === '0') {
                            deferred.reject(); //not allowed to continue
                            $rootScope.currentUser = null;
                            $location.url("/login");
                        } else {
                            $rootScope.currentUser = user;
                            deferred.resolve(); //allow you to login
                        }
                    },
                    //if user is null, then goes to this error
                    function(error) {
                        deffered.reject();
                        $rootScope.currentUser = null;

                    }
                );
            return deferred.promise;
        }

    }
})();
