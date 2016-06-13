var mongoose = require("mongoose");

module.exports = function() {

    var WebsiteSchema = require("./website.schema.server")();
    var Website = mongoose.model("Website", WebsiteSchema);

    var api = {
        createWebsite: createWebsite,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };
    return api;

    //CREATE WEBSITE -----------------

    function createWebsite(userId, website) {
        website._user = userId;
        return Website.create(website);
    }

    //FIND ALL WEBSITES ---------------

    //use find() here because there may be more than 1 website
    function findAllWebsitesForUser(userId) {
        return Website.find({_user: userId});
    }

    //FIND WEBSITE BY ID -----------------

    function findWebsiteById(websiteId) {
        return Website.findById(websiteId);
    }


    //UPDATE WEBSITE -----------------
    function updateWebsite(websiteId, website) {
        delete website._id;
        return Website
            .update({_id: websiteId}, {
                $set: {
                    name: website.name,
                    description: website.description
                }
            });
    }

    //DELETE WEBSITE -----------------

    function deleteWebsite(websiteId) {
        return Website.remove({_id: websiteId});
    }

};