var mongoose = require("mongoose");

module.exports = function() {

    var Results = mongoose.Schema({

        //this is a reference (required from assignment page)
        //ref: User needs to match the mongoose reference (who created me)
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        name : {type: String, required: true},
        type : String
        
    }, {collection: "project.results"});

    return ResultsSchema;
};