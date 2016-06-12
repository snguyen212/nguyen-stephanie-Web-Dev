
(function(){
    angular
        .module("WebAppMaker")
        .controller("WidgetEditController", WidgetEditController);


    function WidgetEditController($routeParams, WidgetEditController) {
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


    }



})();

