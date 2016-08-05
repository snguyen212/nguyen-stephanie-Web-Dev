//displays search results

module.exports = function (app, models) {

    var resultsModel = models.resultsModel;

    app.get("/api/search/:type", searchUsersByType);
    app.get("/api/allusers", findAllUsers);
        
   // /api/user?username=username"

    //FIND ALL RESULTS FOR TYPE --------------------
    function searchUsersByType(req, res) {
        var id = req.params.id;
        var type = req.params.type;

        resultsModel
            .searchUsersByType(type)
            .then(
                function (user) {
                    res.json(user);
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