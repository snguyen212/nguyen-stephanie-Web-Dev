(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    

    function PageService($http) {

        var api = {
            createPage: createPage,
            findPageByWebsiteId: findPageByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage

        };
        return api;
        
        function createPage(websiteId, pageId) {
            var newPage = {
                name: page.name,
                title: page.title,
                websiteId: websiteId
            };
            return $http.post("/api/website/" + websiteId + "/page", newPage);
        }



        function findPageById(pageId) {
            var url = "/api/page/" + pageId;
            return $http.get(url);
          
        }

        function findPageByWebsiteId(websiteId) {
            var url = "/api/website/" + websiteId + "/page";
            return $http.get(url);
        }

        function updatePage(pageId, page) {
            var url = "/api/page/"+pageId;
            return $http.put(url, page);

        }


        function deletePage(pageId) {
            var url = "/api/page/" + pageId;
            return $http.delete(url);
        }
    }
})();