(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController);


    function WidgetListController($sce) {
        var vm = this;
        vm.getTrustedHTML = getTrustedHTML;
        vm.getTrustedUrl = getTrustedUrl;
        
        // trust HTML ---------------------------------------------------------

        function getTrustedHtml(widget) {
            var html = $sce.trustAsHtml(widget.text);
            return widget.text;
        }

        // trust YOUTUBE -------------------------------------------------------
        
        function getTrustedUrl(widget) {
            //splits URL by its slashes so that they can get the ID after last slash
            //turns it into array
            var urlParts = widget.url.split("/");   
            
            //get last element in array
            var id = urlParts[urlParts.length-1];
            var url = "https://www.youtube.com/embed/" + id;
            
            //bypass everything and say that we trust this url
           return $sce.trustAsResource(url);
            
            


        }
    }



})();

