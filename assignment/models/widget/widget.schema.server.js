var mongoose = require("mongoose");

module.exports = function() {

    //says I can't use it as shorthand...
    var TypeEnum = {
        HEADING: "HEADING",
        IMAGE: "IMAGE",
        YOUTUBE: "YOUTUBE",
        HTML: "HTML",
        INPUT: "INPUT"
    };

    var WidgetSchema = mongoose.Schema({
       // order: Number,
        _page: {type:mongoose.Schema.ObjectId,ref:"Page"},
        widgetType: {type: String, enum: ['HEADING', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
        name: String,
        text: String,
        placeholder: String,
        description: String,
        url: String,
        width: String,
        height: String,
        rows: Number,
        size: Number,
        class: String,
        icon: String,
        deletable: Boolean,
        formatted: Boolean,
        dateCreated: {type: Date, default: Date.now}
    }, {collection: "assignment.widget"});

    return WidgetSchema;
};