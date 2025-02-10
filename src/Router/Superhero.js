// Importing the Express framework
var express = require('express');

// Creating an instance of an Express router
var router = express.Router();

// Importing the controller function for adding a superhero
var { addSuperhero, getSuperheros } = require('../Controller/SuperheroController');

/**
 * @route   POST /superheros
 * @desc    Handles adding a new superhero
 * @access  Public (or specify authentication if required)
 */
router.post('/superheros', async (request, response) => {
    // Calling the addSuperhero function to handle the request
    addSuperhero(request, response);
});

// Route handler for GET request on '/superheros' endpoint
// This route will handle the retrieval of all superheroes sorted by humility_score from the in-memory database
router.get('/superheros', async (request, response) => {
    // Calling the 'getSuperheros' function to process the request and send back a response
    // The function is responsible for fetching superhero data and sending it as the response
    getSuperheros(request, response);
});

// Exporting the router to be used in other parts of the application
module.exports = router;