module.exports = function() {

    //load schema
    var UserSchema = require("./user.schema.server")();
    var mongoose = require("mongoose");

    //this object has api that allows us to talk to Database
    //lets us find, update, delete, etc.
    //ex: users will be validated by our schema
    var User = mongoose.model("User", UserSchema);
    
    
    

    var api = {

        //these will interact with database
        createUser: createUser,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserById: findUserById,
        updateUser: updateUser,
        deleteUser: deleteUser



    };

    return api;

    //---------- CREATE USER -----------------------------------
    //pass user instance as json and we want to pass to db
    function createUser(user){
        return User.create(user);   //this inserts user in db
    }

    //---------- FIND USER BY USERNAME -----------------------------------
    function findUserByUsername(){}

   

    //---------- FIND USER BY CREDENTIALS -----------------------------------
    function findUserByCredentials(username, password) {
        //finding user instance where username and pw match
        //.find finds ALL users that match. but we know there's only 1 that match
        // .find returns an array (here it would return array of 1)
        return User.findOne({username: username, password: password});
    }
    

    //---------- FIND USER BY ID -----------------------------------
    function findUserById(userId){
       return User.findById(userId);
        
        //OR can do...
        //User.find({_id: userId});
    }

    //---------- UPDATE USER -----------------------------------
    function updateUser(id, newUser) {
        return User.update(
            {_id: id}, //once you find the record with this id

            //modify and update ONLY fields:
            //(because you don't want them to change pw and username)
            {$set :
                {
                    firstName: newUser.firstName,
                    lastName: newUser.lastName
                }

            }

        );
    }



    //---------- DELETE USER -----------------------------------
    function deleteUser(userId) {
        return User.remove({_id: userId}); //only want to remove user that matches this ID
    }
};