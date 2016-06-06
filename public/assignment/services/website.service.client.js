//UPDATED
//create, find, update, remove websites


(function(){
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    function WebsiteService() {

        var api = {

            findWebsitesForUser: findWebsitesForUser,
            findWebsiteById: findWebsiteById,
            createWebsite: createWebsite,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite

        };
        return api;

        
        // FIND WEBSITE FOR USER ----------------------
        // iterate over array above and fine the user's websites

        function findWebsitesForUser(userId) {
            var url = "/api/user/" + userId + "/website";
            return $http.get(url);
            
        }
        
        function findWebsiteById(websiteId) {
            var url = "/api/website/" + websiteId;
            return $http.get.(url);
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
    