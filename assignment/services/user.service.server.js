module.exports = function(app) {

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];


    //if you see a user, respond with users
    app.get("/api/user", getUsers);
    app.get("/api/user/:userId", findUserById);

    //respond with all users
    function getUsers(request, response) {
        var username = request.query["username"];
        var password = request.query["password"];
        //if you have BOTH username and pw
        if (username && password) {
            findUserByCredentials(username, password, response);
        }
        if (username) {
            findUserByUsername(username, res);
        } else {
            response.send(users);

        }
    }
    
    // if you are given BOTH username AND pw ----------------------------
    function findUserByCredentials(username, password, res) {
        for(var u in users) {
            if(users[u].username === username && users[u].password === password) {
                
                res.send(users[u]);
            }
            }
        }
    
    //if you are given ONLY username --------------------------------------
    function findUserByUsername(username , res) {
        for(var u in users) {
            if(users[u].username === username) {
                res.send(users[u]);
            }
        }


        //if you ask for alice in URL, server will print her username and pw in console
        console.log(username);
        console.log(password);
        response.send(users);   //this sends ALLLLL users
    }

    function findUserById(request, response) {
        var userId = request.params.userId;
        for(var i in users) {
            if(userId === users[i]._id) {
                response.send(users[i]);
            }

        }
        //if you don't find a user, send back empty json object
        response.send({});
    }

};