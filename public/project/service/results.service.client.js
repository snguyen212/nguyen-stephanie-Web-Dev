//UPDATED
//create, find, update, remove websites


(function(){
    angular
        .module("jamn")
        .factory("ResultsService", ResultsService);
    

    function ResultsService($http) {

        var api = {

            findAllUsersForType: findAllUsersForType,
            findAllUsers: findAllUsers

        };
        return api;

        

        function findAllUsersForType(type) {
            var url = "/api/search/" + type;
            return $http.get(url);
        }
        
        function findAllUsers() {
            var url = "/api/allusers";
            return $http.get(url);
            
        }
        
      
    }
})();
    