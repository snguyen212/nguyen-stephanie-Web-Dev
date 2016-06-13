var mongoose = require("mongoose");

module.exports = function() {

    var PageSchema = require("./page.schema.server")();
    var Page = mongoose.model("Page", PageSchema);

    var api = {
        createPage: createPage,
        findAllPagesForWebsite : findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };
    return api;

    //CREATE PAGE -----------------

    function createPage(websiteId, page) {
        page._website = websiteId;
        return Page.create(page);
    }

    //FIND ALL PAGE ---------------

    function findAllPagesForWebsite(websiteId){
        return Page.find({"_website": websiteId});
    }

    //FIND PAGE BY ID -----------------

    function findPageById(pageId){
        return Page.findById(pageId);
    }


    //UPDATE PAGE -----------------
    function updatePage(pageId, page){
        delete page._id;
        return Page
            .update({_id: pageId},{
                $set: {
                    name: page.name,
                    title: page.title,
                    description:page.description
                }
            });
    }

    //DELETE PAGE -----------------

    function deletePage(pageId) {
        return Page.remove({_id: pageId});
    }

};