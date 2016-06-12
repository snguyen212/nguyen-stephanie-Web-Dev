var mongoose = require("mongoose");

module.exports = function() {

    var WebsiteSchema = mongoose.Schema({
        //this is a reference (required from assignment page)
        //ref: User needs to match the mongoose reference (who created me)
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        name: String,
        description: String,
        dateCreated: {type: Date, default: Date.now}
    },
        {collection: "assignment.website"});
    
    return WebsiteSchema;
};