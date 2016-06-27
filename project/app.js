//root of server side application

module.exports = function(app, models) {


    //models contains the map of ALL Models
    //use models to interact with any models you want (can create users, delete widgets, etc.)
    
    var models = require("models.js")();
    // var UserModel = models.userModel;

    var userService = require("./server/user.service.server.js")(app, models);
    // var widgetService = require("./services/widget.service.server.js")(app, models);
    // var websiteService = require("./services/website.service.server.js")(app, models);
    // var pageService = require("./services/page.service.server.js")(app, models);


    var users = [
        {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
        {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
        {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
    ];
};