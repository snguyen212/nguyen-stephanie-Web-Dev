(function () {
    angular
        .module("WebAppMaker")
        .controller("NewPageController", NewPageController);

    function NewPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.userId;
        vm.websiteId = $routeParams.websiteId;
        vm.createPage = createPage;

        function createPage(name, title) {
            if(name) {
                var page = {
                    name: name,
                    title: title
            };
                PageService
                    .createPage(vm.websiteId, page)
                    .then(
                        function (response) {
                            var newPage = response.data;
                            $location.url("/User/" + vm.userId + "/website/" + vm.websiteId + "/page");

                        },

                        function (error) {
                            vm.error = error.data;

                        });

            } else {
                vm.error = "Please enter a name for your page";

            }
        }
    }



})();