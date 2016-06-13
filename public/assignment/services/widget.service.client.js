(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);



    
    function WidgetService($http) {


        var api = {
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            createWidget: createWidget,
            updateWidget: updateWidget,
            deleteWidget: deleteWidget,
            reorderWidget: reorderWidget
        };
        return api;

        
        //FIND WIDGET BY ID -----------------------------
        function findWidgetById(widgetId) {
            var url = "/api/widget" + widgetId;
            return $http.get(url);
        }

        // FIND widget FOR page ----------------------
        // iterate over array above and fine the user's websites

        function findWidgetsByPageId(pageId) {
            var result = [];
            for(var i in widgets) {
                if(widgets[i].pageId === pageId) {
                    result.push(widgets[i]);
                }
            }
            return result;
        }

        function createWidget(widgetType) {
            var newWidget = {
                _id: (new Date()).getTime(),
                widgetType: widgetType
            };

            widgets.push(newWidget);
        }

        function updateWidget(widgetId, widget) {
            var url = "/api/widget/" + widgetId;
            return $http.put(url, widget);
        }


        function deleteWidget(widgetId) {
            var url = "/api/widget/" + widgetId;
            return $http.delete(url);
        }

        function reorderWidget(pageId, start, end) {
            var url = "/page/" + pageId + "widget?start=" + start + "&end=" + end;
            return $http.put(url);

        }


    }


})();

