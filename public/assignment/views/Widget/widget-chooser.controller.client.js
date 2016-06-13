
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetChooserController", WidgetChooserController);


    function WidgetChooserController($location, $routeParams, WidgetService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.pageId = $routeParams.pageId;
        vm.createWidget = createWidget;

        function createWidget(widgetType) {
            var widget = {
                type: widgetType
            };

            WidgetService
                .createWidget(vm.pageId, widget)
                .then(
                    function (response) {
                        var widgetId = response.data._id;
                        $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + widgetId);
                }, 
                    function (error) {
                        vm.error = error.data;
                });

        }
    }

})();