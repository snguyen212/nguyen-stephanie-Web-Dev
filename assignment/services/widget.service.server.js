//creating new widgets, updating, removing
//client service will talk to this



//this is taken from the assignment
module.exports = function (app, model) {
    var multer = require('multer');
    var upload = multer({ dest: __dirname+'/../../public/uploads' });

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
    // TODO: still more functions MORE FROM THE ASSIGNMENT




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
    ///....

    function createWidget(){}
    function findAllWidgetsForPage(){}
    
    
    function findWidgetById(req, res){
        var widget = req.params.widgetId;   //this is the widgetId you get from the URL (from $params up top)
       
       //need to iterate thru array
        for(var i in widgets) {
            if(widgets[i]._id === widgetId) {
                res.json(widgets[i]);       //change the URL so that it is accessible publically for browser
            }
        }
        res.status(404).send("Widget not found");
    }
    function updateWidget() {}



};