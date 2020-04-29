const fs = require('fs');

// Helper method to handle writing the file to the server
exports.writeToFileHelper = (path, data) => {
    checkDirectory(path, (err) => {
        if (err) {
            console.log("Error: ", err);
        } else {
            try {
                fs.writeFileSync(path, JSON.stringify(data));
            } catch (err) {
                console.log(err);
            }
        }
    });
};

const checkDirectory = (directory, callback) => {
    fs.stat(directory, (err, stats) => {
        // check if error defined and the error code is "not exists"
        if (err && err.errno === 34) {
            // create the directory, execute the callback
            fs.mkdir(directory, callback);
        } else {
            // handling if it was a different error
            callback(err);
        }
    });
}