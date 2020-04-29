const activityController = require('../controllers/activityController.js');
const calorieController = require('../controllers/calorieController.js');
const heartController = require('../controllers/heartController.js');
const powerController = require('../controllers/powerController.js');
const stepController = require('../controllers/stepController.js');

module.exports = app => {
    var router = require('express').Router();
    let BASE_URL = "/api/v1/sensor"

    // Post routes to handle saving the sensor data to the file
    router.post("/activity", activityController.handleActivity);

    router.post("/calorie", calorieController.handleCalories);

    router.post("/heart", heartController.handleHeartData);

    router.post("/power", powerController.handlePowerData);

    router.post("/steps", stepController.handleStepData);

    app.use(BASE_URL, router);

}