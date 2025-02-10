var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var cors = require('cors');

var RouterSuperhero = require('./src/Router/Superhero');

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

// Default
app.get('/', (req, res)=> {
    res.json({
        message: `Welcome to Superhero Server`
    })
});

//connect Routers
app.use('/', RouterSuperhero);

module.exports = app;