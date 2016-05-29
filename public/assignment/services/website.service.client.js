//create, find, update, remove websites

(function() {
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
            findWebsiteById: findWebsitesById
        };

        return api;

        function findWebsiteById() {
            for(var i in websites) {
                if(websites[i]._id == websiteId) {
                    return websites[i];
                }

            }
        return null;
        }
        
        // FIND WEBSITE FOR USER ----------------------
        // iterate over array above and fine the user's websites

        function findWebsitesForUser(userId) {
            
            var result = [];   //empty array of sites
            
            for(var i in websites) {
                if(websites[i].developerId === userId) {
                    result.push(websites[i]);
                }
            }
            
            return result;
            

        }
    }
})();
    