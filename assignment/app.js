//root of server side application

module.exports = function(app, models) {
    
    
    //models contains the map of ALL Models
    //use models to interact with any models you want (can create users, delete widgets, etc.)
    var models = require("./models/models.js")();
    var UserModel = models.userModel;

    var userService = require("./services/user.service.server.js")(app, models);
    var widgetService = require("./services/widget.service.server.js")(app, models);
    var websiteService = require("./services/website.service.server.js")(app, models);
    var pageService = require("./services/page.service.server.js")(app, models);



    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    //server asks for requests and client sends response
    //if you don't ask for a specific user, we will assume u want all
    app.get("/allusers", function(req, res){
        request.send(users)
    });

    //if you ask for JUST alice in URL, server will come back with
    //just alice
    //example:     local:3000/allusers/bob
    app.get("/allusers/:username", function(req, res){
        var username = req.params['username'];
        for(var i in users) {
            if(users[i].username === username) {
                res.send(users[i]);
            }
        }
//        res.send(users);
    });

    //when URL matches, node.js will parse request
    //it will see the path of say/message
    app.get("/say/:message", function(req, res) {
        var msg = req.params["message"];

        //send back response
        res.send({message: msg});
    });
};