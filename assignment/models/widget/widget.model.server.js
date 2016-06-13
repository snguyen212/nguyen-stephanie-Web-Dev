var mongoose = require("mongoose");

module.exports = function() {

    var WidgetSchema = require("./widget.schema.server")();
    var Widget = mongoose.model("Widget", PageSchema);

    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage : findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };
    return api;

    //CREATE PAGE -----------------

    function createWidget(pageId, widget){
        widget._page = pageId;
        return Widget
            .find({_page: pageId})
            .then(
                function(widgets) {
                    widget.order = widgets.length;
                    return Widget.create(widget);
                },
                function(error) {
                    return null;
                }
            );
    }

    //FIND ALL WIDGETS ---------------

    function findAllWidgetsForPage(pageId) {
        return Widget.find({"_page":pageId});
    }

    //FIND WIDGET BY ID -----------------

    function findWidgetById(widgetId){
        return Widget.findById(widgetId);
    }


    //UPDATE WIDGET -----------------
    function updateWidget(widgetId, widget){
        delete widget._id;
        return Widget
            .update({_id: widgetId},  {
                $set: widget
            });
    }

    //DELETE WIDGET -----------------

    function deleteWidget(widgetId) {
        return Widget.remove({_id: widgetId});
    }

    //REORDER WIDGET ----------------

    function reorderWidget(pageId, start, end) {
       


    }

};