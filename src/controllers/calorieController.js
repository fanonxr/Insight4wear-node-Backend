const utility = require('../util.js');

// handle the calorie data being written to a json file
exports.handleCalories = (req, res) => {
    if (!req.body.calories) {
        res.status(400).send({ message: "Data cannot be empty" });
        return;
    }

    // decode the fields on the data
    let starttimeBuffer = new Buffer(req.body.starttime);
    let endtimeBuffer = new Buffer(req.body.endtime);
    let calories = req.body.calories;

    // decode the string
    let starttime = starttimeBuffer.toString('ascii');
    let endtime = endtimeBuffer.toString('ascii');


    let calorieData = {
        timestamp: {
            starttime: starttime,
            endtime: endtime,
        },
        calories: calories
    }

    let data = [calorieData];

    // construct what the json will look like
    var jsonContent = JSON.stringify(data);

    // create a unique file name for each request
    let date = new Date();
    let jsonFile = `data/calorie/${date.toUTCString}.json`;

    // write the data from the server to a file
    utility.writeToFileHelper(jsonFile, jsonContent);
};