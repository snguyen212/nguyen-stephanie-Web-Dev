//UPDATED
//create, find, update, remove websites


(function(){
    angular
        .module("jamn")
        .factory("ResultsService", ResultsService);
    

    function ResultsService($http) {

        var api = {

            findAllResultsForType: findAllResultsForType

        };
        return api;

        
        // FIND WEBSITE FOR USER ----------------------
        // iterate over array above and fine the user's websites

        function findAllResultsForType(type) {
            var url = "/api/search" + type;
            return $http.get(url);
        }
      
    }
})();
    