//displays search results

module.exports = function (app, models) {

    var detailsModel = models.detailsModel;

    app.get("/api/search/:type/results/:userId", findUserById);


    //FIND ALL RESULTS FOR TYPE --------------------
    function findUserById(req, res) {
        var type = req.params.type;

        detailsModel
            .findAllResultsForType(userId)
            .then(
                function (userId) {
                    res.json(userId);
                },
                function (error) {
                    res.status(404).send("error");
                }
            );
    }


};