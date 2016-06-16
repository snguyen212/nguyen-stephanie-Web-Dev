//UPDATED before class

module.exports = function(app, models) {

    var websiteModel = models.websiteModel;


    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];




    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findAllWebsitesForUser);
    app.get("/api/website/websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/websiteId", deleteWebsite);




    //CREATE WEBSITE---------------------------------CREATE WEBSITE -----------------

    function createWebsite(req, res) {
        var newWebsite = req.body;      //get site from body of HTTP request
        var userId = req.params.userId;

        websiteModel
            .createWebsite(userId, newWebsite)
            .then(
                function (newWebsite) {
                    res.json(newWebsite);
                },
                function (error) {
                    res.status(400).send(error);
                }
            )
        //return $http.post("/api/user/" + userId + "/website", website)
;
        // for(var i in websites) {
        //     if(websites[i].name === newWebsite.name) { //username already exists so ERROR
        //         res.status(400).send("Website" + newWebsite.name + "already exists");
        //         return;
        //     }

        }

        // newWebsite._id = (new Date()).getTime() + "";  //the empty string converts time to string
        // websites.push(newWebsite);
        // res.json(newWebsite);  //send newUser to CLIENT

    
    
    
    //FIND ALL WEBSITES FOR USER --------------------
    function findAllWebsitesForUser(req, res) {
        //var result = [];
        var userId = req.params.userId;
        console.log(req.session.currentUser);

        websiteModel
            .findAllWebsitesForUser(userId)
            .then(
                function(websites) {
                    res.json(websites);
                },
                function(error) {
                    res.status(404).send("error");
                }
            );
        // for(var i in websites) {
        //     if(websites[i].developerId === userId) {
        //         result.push(websites[i]);
        //     }
        // }
        // res.json(result);
    }


    //TODO: ALL THIS SHIT ----------------------------------

    //FIND WEBSITE BY ID --------------------------
    function findWebsiteById(req, res) {
        var websiteId = req.params.websiteId;

        websiteModel
            .findWebsiteById(websiteId)
            .then(
                function(website) {
                    res.json(website);
                },
                function(error) {
                    res.status(404).send("error");
                }
            );

        // for(var i in websites) {
        //     if(websites[i]._id === websiteId) {
        //         res.send(websites[i]);
        //         return;
        //     }
        // }
        // res.send({});
    }
    
    
    
    //UPDATE WEBSITE ------------------------------
    function updateWebsite(req, res) {
        var id = req.params.websiteId; 
        var newWebsite = req.body;

        websiteModel
            .updateWebsite(websiteId, website)
            .then(
                function(website) {
                    res.json(website);
                },
                function(error) {
                    res.status(400).send("Unable to update website");
                }
            );

        // for(var i in websites) {
        //     if(websites[i]._id === id) {
        //         websites[i].name = newWebsite.name;
        //         websites[i].description = newWebsite.description;
        //         res.send(200);   //200 means it's ok
        //         return;
        //     }
        // }
        

    }


    //DELETE WEBSITE ------------------------------
    function deleteWebsite(req, res) {
        var id = req.params.websiteId;

        websiteModel
            .deleteWebsite(websiteId)
            .then(
                function(success){
                    res.json(200);
                },
                function(error){
                    res.status(404).send("Unable to delete website with ID:" + id);
                }
            );
    }
        // for (var i in websites) {
        //     if (websites[i]._id === id) {
        //         websites.splice(i, 1);
        //         res.send(200);   //200 means it's ok
        //         return;
        //     }
        // }










};