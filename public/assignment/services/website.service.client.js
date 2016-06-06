//UPDATED
//create, find, update, remove websites


(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    

    function WebsiteService($http) {

        var api = {

            findAllWebsitesForUser: findAllWebsitesForUser,
            findWebsiteById: findWebsiteById,
            createWebsite: createWebsite,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite

        };
        return api;

        
        // FIND WEBSITE FOR USER ----------------------
        // iterate over array above and fine the user's websites

        function findAllWebsitesForUser(userId) {
            var url = "/api/user/" + userId + "/website";
            return $http.get(url);
            
        }
        
        //FIND WEBSITE BY ID ----------------------------------
        function findWebsiteById(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.get(url);
        }
        

        //CREATE WEBSITE ----------------------------
        function createWebsite(userId, website){
            var newWebsite = {
                name: website.name,
                description: website.description,
                developerId : userId
            };
            
            return $http.post("/api/User/" + userId + "/website", newWebsite);
        }
        
        
        //UPDATE WEBSITE ----------------------------
        function updateWebsite(websiteId, website){
            var url = "/api/website/" + websiteId;
            return $http.put(url);
        }


        //DELETE WEBSITE ----------------------------
        function deleteWebsite(websiteId){
            var url = "/api/website/" + websiteId;
            return $http.delete(url);
        }

    }
})();
    