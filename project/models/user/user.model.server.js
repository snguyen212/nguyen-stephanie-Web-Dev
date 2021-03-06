
module.exports = function() {

    var mongoose = require("mongoose");
    var UserSchema = require("./user.schema.server")();

    //this object has api that allows us to talk to Database
    //lets us find, update, delete, etc.
    //ex: users will be validated by our schema
    var User = mongoose.model("User", UserSchema);

    var api = {
        createUser: createUser,
        findUserByCredentials: findUserByCredentials,
        findUserByUsername: findUserByUsername,
        findAllUsersForType: findAllUsersForType,
        findUserById: findUserById,
        findAllUsers: findAllUsers,
        updateUser: updateUser,
        deleteUser: deleteUser,
        findGoogleUser: findGoogleUser
        
    };
    return api;

    // FIND Google USER -------------------------------------
    
   
   
    function findGoogleUser(id) {
        return User.findOne({'google.id': id});   //if google id matches id i'm giving you, then return it
    }


    //-------- FIND RESULTS BY TYPE
    function findAllUsersForType(type) {
        return User.find({type: type});
    }
    
    
    
    //---------- CREATE USER -----------------------------------
    //pass user instance as json and we want to pass to db
    function createUser(user) {
        return User.create(user);   //this inserts user in db

        
    }

    //---------- FIND USER BY ID -----------------------------------

    function findUserById(userId) {
        return User.findById(userId);

        //OR can do...
        //User.find({_id: userId});
    }

    //------------FIND ALL USERS

    function findAllUsers() {
        return User.find();
    }


    //---------- FIND USER BY CREDENTIALS -----------------------------------
    //finding user instance where username and pw match
    //.find finds ALL users that match. but we know there's only 1 that match
    // .find returns an array (here it would return array of 1)

    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }


    //---------- FIND USER BY USERNAME -----------------------------------
    function findUserByUsername(username) {
        return User.findOne({username: username});

    }

    //---------- UPDATE USER -----------------------------------

    function updateUser(id, newUser) {
        return User.update(
            {_id: id},          //once you find the record with this id
            {$set :
            {

                //modify and update ONLY fields:
                //(because you don't want them to change pw and username)
                firstame: newUser.firstName,
                lastName: newUser.lastName,
                email: newUser.email,
                type: newUser.type,
                bandname: newUser.bandname,
                bandsize: newUser.bandsize
            }
            }
        );
    }

    //---------- DELETE USER -----------------------------------

    function deleteUser(id) {
        return User.remove({_id: id}); //only want to remove user that matches this ID
    }
};