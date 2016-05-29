(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetListController", WidgetListController)


    function WidgetListController($sce) {
        var vm = this;
        vm.widgets = [
            { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];

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

