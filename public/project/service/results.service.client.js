//UPDATED
//create, find, update, remove websites


(function(){
    angular
        .module("jamn")
        .factory("ResultsService", ResultsService);
    

    function ResultsService($http) {

        var api = {

            searchUsersByType: searchUsersByType,
            findAllUsers: findAllUsers

        };
        return api;

        

        function searchUsersByType(type) {
            var url = "/api/search/" + type;
            return $http.get(url);
        }
        
        function findAllUsers() {
            var url = "/api/allusers";
            return $http.get(url);
            
        }
        
      
    }
})();
    