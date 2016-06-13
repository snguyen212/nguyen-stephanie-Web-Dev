//creating new widgets, updating, removing
//client service will talk to this



//this is taken from the assignment
module.exports = function (app, model) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest:__dirname +'/../../public/uploads' });
    
    widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
    { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    //functions that need to be implemented
    app.post ("/api/upload", upload.single('myFile'), uploadImage);
    app.post("/api/page/:pageId/widget", createWidget);
    app.get("/api/page/:pageId/widget", findAllWidgetsForPage);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);
    app.put("/page/:pageId/widget", reorderWidget);




    function uploadImage(req, res) {
        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;
        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        //redirect user back to Widget Edit Page after they upload a file
        res.redirect("/assignment/#/user/:uid/website/:wid/page/:pid/widget/:widgetId");  
    }



    //CREATE WIDGET -------------------------
    function createWidget(req, res) {
        var newWidget = req.body;
        var pageId = req.params.pageId;
        widgetModel
            .createWidget(pageId, newWidget)
            .then(
                function(newWidget) {
                    res.send(newWidget);

                },
                function(error) {
                    res.status(400).send("Unable to create widget");
                }
            )
    }
    //     newWidget._id = (new Date()).getTime()+"";
    //     widgets.push(newWidget);
    //     res.send(newWidget);
    // }


    // FIND WIDGET BY ID ------------------------
    
    function findWidgetById(req, res) {
        var widgetId = req.params.widgetId;   //this is the widgetId you get from the URL (from $params up top)

        widgetModel
            .findWidgetById(widgetId)
            .then(
                function (widget) {
                    res.json(widget);
            },
                function(error){
                    res.status(404).send("Widget not found");
            });
    }

    //    //need to iterate thru array
    //     for(var i in widgets) {
    //         if(widgets[i]._id === widgetId) {
    //             res.json(widgets[i]);       //change the URL so that it is accessible publically for browser
    //         }
    //     }
    //     res.status(404).send("Widget not found");
    // }




    // FIND ALL WIDGETS FOR PAGE -------------------------
    function findAllWidgetsForPage(req, res) {
        var pageId = req.params.pageId;

        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(
                function(widgets) {
                    res.json(widgets);
            },
                function(error) {
                    res.status(404).send("Unable to find widgets");
            });

    }

    //     var pageId = req.params.pageId;
    //     var result = [];
    //     for(var i in widgets) {
    //         if(widgets[i].pageId === pageId) {
    //             result.push(widgets[i]);
    //         }
    //     }
    //     res.json(result);
    //
    // }
    
    
    // UPDATE WIDGET ----------------
    function updateWidget(req, res) {
        var widgetId = req.params.widgetId;
        var newWidget = req.body;

        widgetModel
            .updateWidget(widgetId, newWidget)
            .then(
                function(newWidget) {
                    res.send(newWidget);
            },
                function (err) {
                    res.status(400).send("Unable to update widget");
            });

    }
    //     for(var i in widgets) {
    //         if(widgets[i]._id === widgetId) {
    //             widgets[i].name = newWidget.name;
    //             widgets[i].text = newWidget.text;
    //
    //             //update url and width if image
    //             if(widgets[i].widgetType === 'IMAGE') {
    //                 widgets[i].url = newWidget.url;
    //                 widgets[i].width = newWidget.width;
    //                 res.send(200);
    //                 return;
    //             }
    //
    //             //if youtube
    //             if(widgets[i].widgetType === 'YOUTUBE') {
    //                 widgets[i].url = newWidget.url;
    //                 widgets[i].width = newWidget.width;
    //                 res.send(200);
    //                 return;
    //             }
    //
    //             //edit size of header if header
    //             else if(widgets[i].widgetType === 'HEADER') {
    //                 widgets[i].size = newWidget.size;
    //                 res.send(200);
    //                 return;
    //             }
    //         }
    //     }
    //     res.status(400).send("Unable to update widget");
    // }
    
    

    function deleteWidget(req, res) {
        var widgetId = req.params.widgetId;
        widgetModel
            .deleteWidget(widgetId)
            .then(
                function(widget) {
                    res.send(widget);
                },
                function(error) {
                    res.status(400).send("Unable to delete widget");
                }
            );
    }
    //     for(var i in widgets) {
    //         if(widgets[i]._id === widgetId) {
    //             widgets.splice(i, 1);
    //             res.send(200);
    //             return;
    //         }
    //     }
    //     res.send(400);
    // }

    //REORDER WIDGET ------------------
    function reorderWidget(req, res) {
        var pageID = req.params.pageId;
        var start = req.query["start"];
        var end = req.query["end"];

        widgetModel
            .reorderWidget(pageID, start, end)
            .then(
                function(widget) {
                    res.send(widget);
                },
                function(error) {
                    res.status(400).send("Error reordering");
                }
            )
    }



};