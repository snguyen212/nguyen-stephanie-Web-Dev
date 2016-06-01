//root of server side application

module.exports = function(app) {

    var userService = require("./services/user.service.server.js")(app);

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];

    //server asks for requests and client sends response
    //if you don't ask for a specific user, we will assume u want all
    app.get("/allusers", function(request, response){
        request.send(users)
    });

    //if you ask for JUST alice in URL, server will come back with
    //just alice
    //example:     local:3000/allusers/bob
    app.get("/allusers/:username", function(request, response){
        var username = request.params['username'];
        for(var i in users){
            if(users[i].username === username) {
                reseponse.send(users[i]);
            }
        }
        //     request.send(users)
    });
    
    //when URL matches, node.js will parse request
    //it will see the path of say/message
    app.get("/say/:message", function(request, response) {
        var msg = request.params["message"];
       
        //send back response
        response.send({message: msg});
        
    });


};