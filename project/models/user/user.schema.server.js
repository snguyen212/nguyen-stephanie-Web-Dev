//describe what a user is to us
//say that username has: id, firstname, lastname, pw, email
//this tells them what we want to store so that db can validate info

module.exports = function() {
    
    //load mongoose
    var mongoose = require("mongoose");
    mongoose.createConnection('mongodb://localhost/cs4550summer1');
    
    
    //give example object of what a user is
    //String = type of schema
    var UserSchema = mongoose.Schema({
        username: {type: String, required: true},
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        //can store whole facebook object here
        google: {
            id: String,
            displayName: String,
            token: String
        },
        // google: {
        //     id:  String
        // },
       // websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Website'}],
        //if you don't provide a date, it'll put in current timestamp
        dateCreated: {type: Date, default: Date.now},
        
        //this date you need to provide the date
        dateUpdated: Date
    
        //specifies collection name
        //assignment is the namespace (specifies we want user only in this assignment)
        //this is to prevent name collision in db if my project also has Users
    }, {collection: "project.user"});
    
    return UserSchema
};