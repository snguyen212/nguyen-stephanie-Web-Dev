(function() {
    angular
        .module("wamirective", [])
        .directive("wamDirective", wamDirective);

    function wamDirective() {
        function linker(scope, element, attributes) {

            var startIndex = -1;
            var stopIndex = -1;

            $(element)
                .sortable({
                    start: function(event, ui) {
                        console.log("sorting begins");
                        startIndex = ui.item.index();
                    },
                    stop: function(event, ui) {
                        console.log("sorting stopped");
                        endIndex = ui.item.index();
                        console.log(endIndex);


                        var sortedElement = scope.data.splice(startIndex, 1)[0];
                        scope.data.splice(endIndex, 0, sortedElement);

                        scope.$apply();
                        scope.reorder({start: startIndex, end: stopIndex});
                    }
                });
        }
        return {
            scope: {
                data: "=",
                reorder: "&sorted"
            },
            link: linker
        }
    }
})();
