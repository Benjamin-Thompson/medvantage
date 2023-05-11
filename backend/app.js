/*
* This is the starting point for the app with many of the require statements and an entry point
*/

//Require Dependancies
const express = require('express');
const bodyParser = require("body-parser");
const cors = require('cors');
const path = require('path');

//Require Custom Code
const devlog = require('./utilities/devlog');
const mysql = require('./utilities/mysql');

//Variable Setters
const app = express();
const filepath =  '/Users/cameronwilliams/Downloads';
app.set('filepath', filepath);
//App Uses
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, '../../client')));
app.use(cors());
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'POST,GET,OPTIONS,PUT,DELETE');
    res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, Origin, X-Requested-With, Accept");
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
});

//Custom Routes
const authentication = require('./routes/authentication');
app.use('/api/v2', authentication);

const general = require('./routes/general');
app.use('/api/v2', general);

const dashboard = require('./routes/dashboard');
app.use('/api/v2/dashboard', dashboard);

const uploads = require('./routes/uploads');
app.use('/api/v2/uploads', uploads);

app.use(function(request, response) {
    response.status(404);
    response.send(`Not Found`);
})


//Listen on Server
const server = app.listen(3000, function(){
    devlog.log("Listening on port 3000");
});

