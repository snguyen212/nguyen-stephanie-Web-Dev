//passport notes the user info into the session

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;

module.exports = function (app, models) {

    var userModel = models.userModel;

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


    //want PASSPORT to handle authentication with login
    //after authenticated, it will call login function

    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
    app.get('/auth/google/callback',
        passport.authenticate('google', {
            successRedirect: '/#/profile',
            failureRedirect: '/#/login'
        }));
    app.post("/api/login", passport.authenticate('jamn'), login);
    app.get("/api/user", getUsers);
    app.get("/api/loggedin", loggedin);
    
    app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.get("/api/user?username=username", findUserByUsername);
    app.get("/api/user/:userId", findUserById);
    app.get("/api/allusers", findAllUsers);
    app.get("/api/search/:type", findAllUsersForType);
    app.post("/api/user", createUser);
    app.post("api/register", register);
    app.post('/api/logout', logout);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    var googleConfig = {
        clientID     : process.env.GOOGLE_CLIENT_ID,
        clientSecret : process.env.GOOGLE_CLIENT_SECRET,
        callbackURL  : process.env.GOOGLE_CALLBACK_URL
    };


    passport.use('jamn', new LocalStrategy(localStrategy));
    passport.use(new GoogleStrategy(googleConfig, googleStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);



    console.log(googleConfig.callbackURL);





    function googleStrategy(token, refreshToken, profile, done) {
        userModel
            .findGoogleUser(profile.id)
            .then(
                function(user) {
                    if(user) {
                        return done(null, user);
                    } else {
                        var email = profile.emails[0].value;
                        var emailSplit = email.split("@");
                        var newGoogleUser = {
                            username: emailSplit[0],
                            firstName: profile.name.givenName,
                            lastName: profile.name.familyName,
                            email: email,
                            google: {
                                id: profile.id,
                                token: token,
                                displayName: emailSplit[0]
                            }
                        };
                        return userModel
                            .createUser(newGoogleUser);
                    }
                },
                function(err) {
                    if (error) {
                        return done(error);
                    } else {
                        return done(null, false);
                    }
                }
            )
            .then(
                function(user){
                    return done(null, user);
                },
                function(err){
                    if (error) {
                        return done(error);
                    } else {
                        return done(null, false);
                    }
                }
            );
    }



    //PASSPORT -------------------------------------
    function localStrategy(username, password, done) {
        console.log("Inside local strategy");
        userModel
            .findUserByUsername(username)
            .then(
                function(user) {
                    console.log("in local and user is = " + user);
                    //if username entered and passwords match
                    if(user && bcrypt.compareSynch(user.password, password)) {
                        console.log("user found");
                        return done(null, user);
                    } else {
                        console.log("user not found");
                        return done(null, false);
                    }
                },
                function (err) {
                    if (err) {
                        return done(err);
                    }
                }
            );
    }


    //AUTHENTICATE -----------------------------------------
    function authenticate(req, res) {
       // console.log(req, user);
        //console.log(req, isAuthenticated());
        if (req.isAuthenticated()) {
            //if authenticated, it's ok so look at next requests
            next();

        } else {
            res.send(403);
        }
    }


    //SERIALIZE --------------------------------------
    //decide what you want to put in cookie/session
    //want to put entire user object in cookie (id, username, pw, first and last name, etc

    function serializeUser(user, done) {
        done(null, user);
    }

    //DESERIALIZE ----------------------------------------------
    //gives us BACK the cookie and determine what you want to do with it
    //here you just want to see if user ID is a valid user
    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(
                function (user) {
                    console.log("inside deserialize");
                    console.log(user);
                    done(null, user);
                },
                function (err) {
                    done(err, null);
                }
            );
    }


    //LOGIN-------------------
    function login(req, res) {
        console.log("inside login and req is =" + req);
        var user = req.user;
        console.log(user);
        res.json(user);
    }


    // CREATE USER --------------------------------------
    function createUser(req, res) {
        var newUser = req.body;

        userModel
            .createUser(newUser)
            .then(
                function (user) {
                    res.json(user);
                },
                function (error) {
                    res.status(400).send("Username " + newUser.username + " is already in use");
                }
            );
    }


    //REGISTER----------------------------
    function register(req, res) {
        var username = req.body.username;
        var password = req.body.password;
        userModel
            .findUserByUsername(username)
            .then(
                //if user already exists, then ERROR
                function (user) {
                    if (user) {
                        res.status(400).send("Username already exists");

                    } else {
                        userModel
                            .createUser(req.body); //create user that's found in body
                        user.password = bcrypt.hashSync(user.password);
                        return userModel.createUser(user);
                    }
                },
                //if user doesn't exists, create the user
                function (error) {
                    res.status(400).send(error);
                })

            //DON'T next "thens". this is OUTSIDE and AFTER the first then
            .then(
                function (user) {
                    if (user) {
                        req.login(user, function (err) {
                            if (err) {
                                res.status(400).send(err);

                                //safely logs user in here
                            } else {
                                res.json(user);
                            }
                        });
                    }

                },
                function (error) {
                    res.status(404).send(error);

                }
            );
    }

    //LOGOUT -----------
    function logout(req, res) {
        req.logout();
        res.send(200);

    }

    //LOGGEDIN ------------------

    function loggedin(req, res) {
        if (req.isAuthenticated()) {
            res.json(req.user);     //if authenticated, then send entire user object
        } else {
            res.send('0');
        }
    }

    //DELETE USER ---------------

    function deleteUser(req, res) {
        var id = req.params.userId;

        userModel
            .deleteUser(id)
            .then(
                function (status) {
                    res.send(200);
                },
                function (error) {
                    res.status(404).send("Unable to remove user with ID: " + id);
                }
            );
    }


    function updateUser(req, res) {
        var id = req.params.userId;
        var newUser = req.body;
        userModel
            .updateUser(id, newUser)
            .then(
                function (user) {
                    res.sendStatus(200);
                },
                function (error) {
                    res.status(404).send("Unable to update user with ID: " + id);
                }
            );

    }

    function findUserById(req, res) {
        var userId = req.params.userId;
        userModel
            .findUserById(userId)
            .then(
                function (user) {
                    res.send(user);
                },
                function (error) {
                    res.status(400).send(error);
                }
            );
    }

    //FIND ALL Users FOR TYPE --------------------
    function findAllUsersForType(req, res) {
        var id = req.params.id;
        var type = req.params.type;

        userModel
            .findAllUsersForType(type)
            .then(
                function (users) {
                    res.json(users);
                },
                function (error) {
                    res.status(404).send("error");
                }
            );
    }


    //GET USERS --------------------------------------
    function getUsers(req, res) {
        var username = req.query["username"];
        var password = req.query["password"];

        if (username && password) {
            findUserByCredentials(username, password, res);
        } else if (username) {
            findUserByUsername(username, req, res);
        } else {
            res.send(users);
        }
    }

    //FIND ALL USERS ----------------------------------------


    function findAllUsers(req, res) {
        userModel
            .findAllUsers()
            .then(
                function(users) {
                    res.json(users);
                },
                function(error) {
                    res.status(404).send("No users found");
                }
            );

    }

    //FIND USERS BY CREDENTIALS -----------------------------
    function findUserByCredentials(username, password, req, res) {

        userModel
            .findUserByCredentials(username, password)
            .then(
                function (user) {
                    req.user = user;
                    res.json(user);
                },
                function (error) {
                    res.status(403).send("Unable to login");
                }
            );
    }


    function findUserByUsername(username, req, res) {
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    req.user = user;
                    res.json(user);
                },
                function (error) {
                    res.status(403).send("Unable to login");
                }
            );
    }
};