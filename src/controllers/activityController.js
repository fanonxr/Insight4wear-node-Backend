const utility = require('../util.js');

// handle the activity data and write it to a file
exports.handleActivity = (req, res) => {
    if (!req.body.activity) {
        res.status(400).send({ message: "Data cannot be empty" });
        return;
    }
    console.log(req.body);
    // decode the fields on the data
    let starttimeBuffer = new Buffer(req.body.starttime);
    let endtimeBuffer = new Buffer(req.body.endtime);
    let activityBuffer = new Buffer(req.body.activity);
    let duration = req.body.duration;

    // decode the string
    let starttime = starttimeBuffer.toString('ascii');
    let endtime = endtimeBuffer.toString('ascii');
    let activity = activityBuffer.toString('ascii');

    let activityData = {
        timestamp: {
            starttime: starttime,
            endtime: endtime,
        },
        duration: duration,
        activity: activity,
    }

    let data = [activityData];

    // construct what the json will look like
    var jsonContent = JSON.stringify(data);

    // create a unique file name for each request
    let date = new Date();
    let jsonFile = `data/calorie/${date.toUTCString}.json`;

    // write the data from the server to a file
    utility.writeToFileHelper(jsonFile, jsonContent);
};

