
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);


    function WidgetEditController($routeParams, WidgetService) {
        var vm = this;
        
        //extract widgetId from URL
        var widgetId = $routeParams.widgetId;
        
        function init() {
            console.log(widgetId);

            WidgetService
                .findWidgetById(widgetId)
                .then(
                    function(response) {
                        vm.widget = reponse.data;
                    },

                    function(error) {
                        vm.error = error.data;
                })

        }

        init();

        function updateWidget(widget) {
            if (widget.name) {
                WidgetService
                    .updateWidget(vm.widgetId, widget)
                    .then(
                        function (response) {
                            $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                        },
                        function (response) {
                            vm.error = "Unable to update Widget";
                        });
            } else {
                vm.error("Please enter a widget name")
            }
        }
        
    }

    function deleteWidget(){
        WidgetService
            .deleteWidget(vm.widgetId)
            .then(
                function(response) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget");
                },
                function(response){
                    vm.error = err.data;
                });
    }

    
})();

