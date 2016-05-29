

(function(){
    angular
        .module("WebAppMaker")
        .config(Config);

    function Config($routeProvider) {   //helps to configure the routes
        $routeProvider
            
            //user routs

            .when("/login", {
                templateUrl: "views/Users/login.view.client.html",  //if you see #/login, go to here
                controller: "LoginController",
                controllerAs: "model" //our controller is the model


            })
            .when("/profile/:id", {
                templateUrl: "views/Users/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model" //our controller is the model

            })


            .when("/register", {
                templateUrl: "views/Users/register.view.client.html"
            })
            
            
            //Website Routes -----------

            .when("/user/:userID/website", {
                templateUrl: "views/Website/website-list.view.client.html",
                controller: "WebsiteListController",
                controllerAs: "model"

            })
            
            .when("/user/:userId/website/:websiteId", {
                templateUrl: "views/Website/website-edit.view.client.html"
            })
        
            // PAGE Routes -------
        
        
            //Widget Routs -------
            
            //when you see this url, go to the template url
            .when("user/:uid/website/:wid/page/widget", {
                templateUrl: "views/Widget/widget-list-view-client.html",
                controller: "WidgetListController",
                controllerAs: "model"    //means in the html, you access by saying {{model/widgets}} something like this....
            })
                
            .when("#/user/:uid/website/:wid/page/:pid/widget/new", {
                templateUrl: "views/Widget/widget-chooser.view.client.html"
                
            })

            //if NONE of the routes above, go to login page
            .otherwise({
                redirectTo: "/login"

            });


    }
})();
