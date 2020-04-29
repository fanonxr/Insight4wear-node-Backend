const utility = require('../util.js');

// handle the activity data and write it to a file
exports.handlePowerData = (req, res) => {
    if (!req.body.watts) {
        res.status(400).send({ message: "Data cannot be empty" });
        return;
    }
    // decode the fields on the data
    let starttimeBuffer = new Buffer(req.body.starttime);
    let endtimeBuffer = new Buffer(req.body.endtime);
    let watts = req.body.watts;

    // decode the string
    let starttime = starttimeBuffer.toString('ascii');
    let endtime = endtimeBuffer.toString('ascii');

    let powerData = {
        timestamp: {
            starttime: starttime,
            endtime: endtime,
        },
        watts: watts,
    }

    let data = [powerData];

    // construct what the json will look like
    var jsonContent = JSON.stringify(data);

    // create a unique file name for each request
    let date = new Date();
    let jsonFile = `data/power/${date.toUTCString}.json`;

    // write the data from the server to a file
    utility.writeToFileHelper(jsonFile, jsonContent);
};