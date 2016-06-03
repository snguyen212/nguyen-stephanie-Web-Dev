//UPDATED before class

module.exports = function(app) {

    var users = [
        {_id: "123", username: "alice",    password: "alice",    firstName: "Alice",  lastName: "Wonder"  },
        {_id: "234", username: "bob",      password: "bob",      firstName: "Bob",    lastName: "Marley"  },
        {_id: "345", username: "charly",   password: "charly",   firstName: "Charly", lastName: "Garcia"  },
        {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose",   lastName: "Annunzi" }
    ];



    app.get("/api/user", getUsers);
    app.post("/api/user", createUser);
    app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.get("/api/user?username=username", findUserByUsername);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function createUser(req, res) {
        var newUser = req.body;      //get user from body of HTTP request

        for(var i in users) {
            if(users[i].username === newUser.username) { //username already exists so ERROR
                res.status(400).send("Username" + newUser.username + "already exists");
                return;
            }

        }

        newUser._id = (new Date()).getTime() + "";  //the empty string converts time to string
        users.push(newUser);
        res.json(newUser);  //send newUser to CLIENT
    }




    //extract ID from URL and look for the user in array. and take it out
    function deleteUser(req, res) {
        var id = req.params.userId;  //userId is from the params in the put URL
        for(var i in users) {
            if(users[i]._id === id) {
                users.splice(i, 1);   //splice means to delete
                res.send(200);   //200 means it was a success
                return;
            }
        }
        //if something went wrong, status is 400 error and send an error message
        res.status(404).send("Unable to delete user with ID:" + id);



    }

    //this code was taken from user.service.client
    //look at ID given to you from URL

    function updateUser(req, res) {
        var id = req.params.userId;  //userId is from the params in the put URL
        var newUser = req.body;  //parse the newUser from body of this func

        for(var i in users) {
            if(users[i]._id === id) {
                users[i].firstName = newUser.firstName;
                users[i].lastName = newUser.lastName;
                res.send(200);   //200 means it's ok
                return;
            }
        }
        //if something went wrong, status is 400 error and send an error message
        res.status(400).send("Unable to update");

    }


    function findUserById(req, res) {
        var userId = req.params.userId;
        for(var i in users) {
            if(userId === users[i]._id) {
                res.send(users[i]);
                return;
            }
        }
        //if you don't find a user, send back empty json object
        res.send({});
    }

    //respond with all users ---------------------------------
    function getUsers(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];

        //if you have BOTH username and pw
        if (username && password) {
            findUserByCredentials(username, password, res);
        }
        else if(username) {
            findUserByUsername(username, res);
        }
        else {
            //this is where it usually checks if you're an admin so that u can view all users
            res.send(users);
        }
    }



    // if you are given BOTH username AND pw ----------------------------
    function findUserByCredentials(username, password, res) {
        for(var u in users) {
            if(users[u].username === username && users[u].password === password) {
                res.send(users[u]);
                return;
            }
        }
        res.send(403); //if you DON"T find credentials, send error to Login.Controller
    }



    //if you are given ONLY username --------------------------------------
    function findUserByUsername(username, res) {
        for(var u in users) {
            if(users[u].username === username) {

                //if you ask for alice in URL, server will print her username and pw in console
                console.log(username);
                res.send(users[u]);
                response.send(users);   //this sends ALLLLL users
                return;
            }
        }
        res.send({});
    }
};