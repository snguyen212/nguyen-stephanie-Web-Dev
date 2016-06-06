

module.exports = function(app) {

    var pages = [
        { "_id": "321", "name": "Post 1", "websiteId": "456" },
        { "_id": "432", "name": "Post 2", "websiteId": "456" },
        { "_id": "543", "name": "Post 3", "websiteId": "456" }
    ];



    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findAllPagesForWebsite);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);




    //CREATE PAGE---------------------------------CREATE PAGE -----------------

    function createPage(req, res) {
        var newPage = req.body;

        for(var i in pages) {
            if(pages[i].name === newPage.name) {
                res.status(400).send("Page" + newPage.name + "already exists");
                return;
            }

        }

        newPage._id = (new Date()).getTime() + "";
        pages.push(newPage);
        res.send(newPage);
    }
    

    //FIND ALL PAGES FOR WEBSITE --------------------
    function findAllPagesForWebsite(req, res) {
        var result = [];
        var websiteId = req.params.websiteId;
        for(var i in pages) {
            if(pages[i].websiteId === websiteId) {
                result.push(pages[i]);
            }
        }
        res.json(result);
    }

    //FIND PAGES BY ID --------------------------
    function findPageById(req, res) {
        var pageId = req.params.pageId;
        for(var i in pages) {
            if(pages[i]._id === pageId) {
                res.send(pages[i]);
                return;
            }
        }
        res.send({});
    }
    
    
    
    //UPDATE PAGE ------------------------------
    function updatePage(req, res) {
        var pageId = req.params.pageId;
        var newPage = req.body;

        for(var i in pages) {
            if(pages[i]._id === pageId) {
                pages[i].name = newPage.name;
                pages[i].title = newPage.title;
                res.send(200);   //200 means it's ok
                return;
            }
        }
        
        res.status(400).send("Unable to update page");
    }


    //DELETE PAGE ------------------------------
    function deletePage(req, res) {
        var pageId = req.params.pageId;
        for(var i in pages) {
            if (pages[i]._id === pageId) {
                pages.splice(i, 1);
                res.send(200);
                return;
            }
        }

        res.status(404).send("Unable to delete page with ID:" + id);


    }


};