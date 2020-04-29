const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

// Cors Options
var corOptions = {
    origin: "http:localhost:8081"
}

app.use(cors(corOptions));

// handle parsing the request as json
app.use(bodyParser.json());
// parse request of content-type - form url encoded
app.use(bodyParser.urlencoded({ extended: true }));

// setup base route
app.get('/', (req, res) => {
    res.json({ message: 'Welcome to Insight4Wear' }); // Possibly update this with the current Webpage
});

// setup the routes
require('./src/routes/routes.js')(app);

const PORT = process.env.PORT || 8081;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})