const utility = require('../util.js');

// handle the activity data and write it to a file
exports.handleStepData = (req, res) => {
    if (!req.body.step_count_delta) {
        res.status(400).send({ message: "Data cannot be empty" });
        return;
    }
    // decode the fields on the data
    let starttimeBuffer = new Buffer(req.body.starttime);
    let endtimeBuffer = new Buffer(req.body.endtime);
    let stepCountDelta = req.body.step_count_delta;

    // decode the string
    let starttime = starttimeBuffer.toString('ascii');
    let endtime = endtimeBuffer.toString('ascii');

    let stepData = {
        timestamp: {
            starttime: starttime,
            endtime: endtime,
        },
        step_delta: stepCountDelta
    }

    let data = [stepData];

    // construct what the json will look like
    var jsonContent = JSON.stringify(data);

    // create a unique file name for each request
    let date = new Date();
    let jsonFile = `data/steps/${date.toUTCString}.json`;

    // write the data from the server to a file
    utility.writeToFileHelper(jsonFile, jsonContent);
};