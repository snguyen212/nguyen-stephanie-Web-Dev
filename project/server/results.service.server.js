//displays search results

module.exports = function (app, models) {

    var resultsModel = models.resultsModel;

    app.get("/api/search/:type/results", findAllResultsForType);


    //FIND ALL RESULTS FOR TYPE --------------------
    function findAllResultsForType(req, res) {
        var type = req.params.type;

        resultsModel
            .findAllResultsForType(type)
            .then(
                function (type) {
                    res.json(type);
                },
                function (error) {
                    res.status(404).send("error");
                }
            );
    }


};