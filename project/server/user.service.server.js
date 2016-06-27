//passport notes the user info into the session

var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt = require("bcrypt-nodejs");
var FacebookStrategy = require('passport-facebook').Strategy;

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
            type: "Guitarist"
        },
        {
            _id: "234",
            username: "bob",
            password: "bob",
            firstName: "Bob",
            lastName: "Marley",
            email: 'bob@marley.com',
            type: "Pianist"
        },
        {
            _id: "345",
            username: "charly",
            password: "charly",
            firstName: "Charly",
            lastName: "Garcia",
            email: 'charly@garcia.com',
            type: "Singer"
        },
        {
            _id: "456",
            username: "jannunzi",
            password: "jannunzi",
            firstName: "Jose",
            lastName: "Annunzi",
            email: 'jose@annunzi.com',
            type: "Drummer"
        }
    ];


    //want PASSPORT to handle authentication with login
    //after authenticated, it will call login function

    app.get('/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    app.get("/auth/facebook/callback",
        passport.authenticate('facebook', {
            successRedirect: '/project/#/profile',
            failureRedirect: '/project/#/login'
        }));
    app.post("/api/login", passport.authenticate('jamn'), login);
    app.get("/api/user", getUsers);
    app.get("/api/loggedin", loggedin);
    app.get("/api/user?username=username&password=password", findUserByCredentials);
    app.get("/api/user?username=username", findUserByUsername);
    app.get("/api/user/:userId", findUserById);
    app.post("/api/user", createUser);
    app.post("api/register", register);
    app.post('/api/logout', logout);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", authenticate, deleteUser);


    passport.use('jamn', new LocalStrategy(localStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var facebookConfig = {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL

    };

    console.log(facebookConfig.callbackURL);


    passport.use(new FacebookStrategy(facebookConfig, facebookStrategy));


    function facebookStrategy(token, refreshToken, profile, done) {
        var id = profile.id;
        userModel
            .findFacebookUser(id)
            .then(
                function (user) {
                    if (user) {
                        return done(null, user);
                    } else {
                        var user = {
                            username: profile.displayName.replace(/ /g, ''),
                            facebook: {
                                id: profile.id,
                                displayName: profile.displayName,
                                token: token
                            }
                        };
                        return userModel
                            .createUser(user);
                    }
                }
            )
            .then(
                function (user) {
                    return done(null, user);
                },

                function (error) {
                    return done(null);
                }
            );
    }


    //PASSPORT -------------------------------------
    function localStrategy(username, password, done) {
        console.log("Inside local strategy");
        userModel
            .findUserByUsername(username)
            .then(
                function (user) {
                    console.log(user);
                    //if username entered and passwords match
                    if (user && bcrypt.compareSynch(user.password, password)) {
                        console.log("if");
                        return done(null, user);
                    } else {
                        console.log("else");
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
        console.log(req, user);
        console.log(req, isAuthenticated());
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
        console.log("inside login");
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
                    res.send(200);
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
