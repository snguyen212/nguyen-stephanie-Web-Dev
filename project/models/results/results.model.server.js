var mongoose = require("mongoose");

module.exports = function() {

    var ResultsSchema = require("./results.schema.server")();
    var Results = mongoose.model("Results", ResultsSchema);

    var api = {

        searchUsersByType: searchUsersByType,
        getAllUsers: getAllUsers


    };
    return api;
    

    
    //use find() here because there may be more than 1 website
    function  searchUsersByType(type) {
        return Results.find({_user: type});
    }

    function getAllUsers() {
        return Results.find();
    }
    
    
    
    
};