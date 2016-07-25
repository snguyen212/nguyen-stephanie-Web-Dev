module.exports = function() {
   //each model will create an API that will allow us to interact with users
    // ex: find users, update, remove, etc.
    //allows you to store/retrieve from database

    var mongoose = require('mongoose');
    mongoose.connect('mongodb://localhost/cs4550summer1');
    //store ALL models in this ap

    var userModel = require("./user/user.model.server.js");
    
    var models = {
        userModel: userModel,
       // websiteModel: websiteModel,
       // pageModel: pageModel,
        //widgetModel: widgetModel
    };
    
    return models;
};