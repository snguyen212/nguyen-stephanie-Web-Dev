//root of server side application

module.exports = function(app, models) {


    //models contains the map of ALL Models
    //use models to interact with any models you want (can create users, delete widgets, etc.)
    
    var models = require("./models/models.js")();
    var UserModel = models.userModel;

    var userService = require("./services/user.service.server.js")(app, models);
    // var widgetService = require("./services/widget.service.server.js")(app, models);
    // var websiteService = require("./services/website.service.server.js")(app, models);
    // var pageService = require("./services/page.service.server.js")(app, models);


    var users = [
        {
            _id: "123",
            username: "alice",
            password: "alice",
            firstName: "Alice",
            lastName: "Wonder",
            email: 'alice@wonderland.com',
            type: "guitarist"
        },
        {
            _id: "234",
            username: "bob",
            password: "bob",
            firstName: "Bob",
            lastName: "Marley",
            email: 'bob@marley.com',
            type: 'drummer',
            bandname: 'Rockin Dudes',
            bandsize: '3'
        },
        {
            _id: "345",
            username: "charly",
            password: "charly",
            firstName: "Charly",
            lastName: "Garcia",
            email: 'charly@garcia.com',
            type: "singer"
        },
        {
            _id: "456",
            username: "jannunzi",
            password: "jannunzi",
            firstName: "Jose",
            lastName: "Annunzi",
            email: 'jose@annunzi.com',
            type: "drummer"
        }
    ];
};