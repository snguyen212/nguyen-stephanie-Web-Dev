

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
            .when("/profile/:id", {
                templateUrl: "views/User/profile.view.client.html",
                controller: "ProfileController",
                controllerAs: "model" //our controller is the model

            })


            .when("/register", {
                templateUrl: "views/User/register.view.client.html",
                controller: "RegisterController",
                controllerAs: "model"
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
            

            .when("/flickr", {
                templateUrl: "views/Widget/widget-flickr-search.view.client.html",
                controller: "FlickrImageSearchController",
                controllerAs: "model"
            })

            //if NONE of the routes above, go to login page
            .otherwise({
                redirectTo: "/login"

            });


    }
})();
