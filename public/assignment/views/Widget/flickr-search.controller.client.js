
(function(){
    angular
        .module("WebAppMaker")
        .controller("FlickrImageSearchController", FlickrImageSearchController)


    function FlickrImageSearchController(FlickrService) {
        var vm = this;
        vm.searchPhotos = searchPhotos;
        
        function searchPhotos(searchText) {
            console.log(searchText);
            FlickrService
                .searchPhotos(searchText)
                .then(
                    function(response){
                        vm.photos = response.data;
                    },
                    function(error){
                        vm.error = error.data;
                    }
                )
            
        }


    }



})();

