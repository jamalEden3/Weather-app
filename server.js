const express = require('express');

const app = express();

const cors = require('cors');
app.use(cors());

const bodyParser = require('body-parser');



// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes

// Start up an instance of app

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance

// Initialize the main project folder
app.use(express.static('website'));


// Setup Server
const getAll = (req, res) => res.status(200).send(projectData);
app.get('/all', getAll);

const postData = (req, res) => {
    projectData = req.body;
    console.log(projectData);
    res.status(200).send(projectData);
}
app.post('/add', postData);

const port = 4000;
const hostName = "127.0.0.1";

const listening = () => {
    console.log(`server is runing at ${port} with hostname ${hostName}`)
}
app.listen(port, listening);