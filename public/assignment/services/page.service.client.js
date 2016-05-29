(function () {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);

    var pages = [
    { "_id": "321", "name": "Post 1", "websiteId": "456" },
    { "_id": "432", "name": "Post 2", "websiteId": "456" },
    { "_id": "543", "name": "Post 3", "websiteId": "456" }

    ];

    function PageService() {

        var api = {
        createPage: createPage,
        findPageByWebsiteId: findPageByWebsiteId,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage

        };
        return api;

        function findPageById(pageId) {
            for(var i in pages) {
                if(websites[i]._id === pageId) {
                    return pages[i];
                }
            }
            return null;
          
        }

        function findPageByWebsiteId(websiteId) {
            var result = [];
            for(var i in pages) {
                if(pages[i].pageId === websiteId) {
                    result.push(pages[i]);
                }
            }
            return result;
        }

    }
})();