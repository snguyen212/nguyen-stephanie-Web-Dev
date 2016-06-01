//responseble for talking to Flickr

(function () {
    angular
        .module("WebAppMaker")
        .factory("FlickrService", FlickrService);


     // INSERT key and Secret here in FLickr
    // need to go to flickr to apply for it for Free Form Text Search

    // Key:
    //     0a3269f45a4f628272e8d2387707ca0c
    //
    // Secret:
    //     209254c1471edb01


    function FlickrService() {


        var api = {
            searchPhotos: searchPhotos
        };
        return api;

        function searchPhotos(searchTerm) {
            var url = "/api/user/" + id ;
            return $http.get(url);
        }
    }


})();

