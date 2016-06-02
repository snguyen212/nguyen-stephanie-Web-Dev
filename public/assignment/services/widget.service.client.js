(function () {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);



      

    function WidgetService($http) {


        var api = {
            findWidgetsByPageId: findWidgetsByPageId,
            findWidgetById: findWidgetById,
            createWidget: createWidget
        };
        return api;

        function findWidgetById(widgetId) {
            for(var i in widgets) {
                if(widgets[i]._id === widgetId) {
                    return widgets[i];
                }
            }
            return null;
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


    }


})();

