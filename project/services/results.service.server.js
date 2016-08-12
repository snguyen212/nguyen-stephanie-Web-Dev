//displays search results

module.exports = function (app, models) {

    var userModel = models.userModel;

    app.get("/api/search/:type", findAllResultsForType);
    app.get("/api/allusers", findAllUsers);
        
   // /api/user?username=username"

    //FIND ALL RESULTS FOR TYPE --------------------
    function findAllResultsForType(req, res) {
        var id = req.params.id;
        var type = req.params.type;

        userModel
            .findAllResultsForType(type)
            .then(
                function (users) {
                    res.json(users);
                },
                function (error) {
                    res.status(404).send("error");
                }
            );
    }
    
    
    function findAllUsers(req, res) {
        resultsModel
            .findAllUsers()
            .then(
                function(users) {
                    res.json(users);
                },
                function(error) {
                    res.status(404).send("error");
                }
            );
        
    }


};