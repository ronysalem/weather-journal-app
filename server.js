// Setup empty JS object to act as endpoint for all routes
projectData = {
    date: "",
    temp:"",
    feelings:""
};
const port = 3000;

// Require Express to run server and routes
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
app.use(cors());
// Initialize the main project folder
app.use(express.static('website'));

// get route to return the data 
app.get('/getData', function (req, res) {
    res.send(projectData);
})

// post route to add the data 
app.post('/acceptData', acceptData);

function acceptData(req, res) {
    res.send(); //empty response for not handling the request
        projectData.date= req.body.date;
        projectData.temp=req.body.temp;
        projectData.feelings= req.body.feelings;
        console.log(projectData);
}



// Setup Server
app.listen(port, () => {
    console.log(`sever is running on port ${port}`);
})